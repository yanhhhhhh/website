'use client';
import { Button, GetProp, Upload } from 'antd';

import { UploadProps } from 'antd';

import { TFile } from '@/api/file';
import { message } from '@/providers';

import { TPlatform } from '@/pages/editor/type';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';
import { FC, ReactNode } from 'react';
import ImageUpload from '../imageUpload';
import './index.less';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface VideoUploadProps {
  uploadButton?: ReactNode; //上传静态资源组件
  platform: TPlatform;
  uploadOssPath: string;
  ossFile?: TFile;
  ossFilePoster?: TFile;
  size: { width: number; height: number };
  onVideoChange: (info: TFile) => void;
  onVideoPosterChange: (info?: TFile) => void;
}
const accept = '.mp4';
export const VideoUpload: FC<VideoUploadProps> = (props) => {
  const {
    uploadButton,
    platform,
    ossFile,
    uploadOssPath,
    onVideoChange,
    onVideoPosterChange,
    ossFilePoster,
    size,
  } = props;

  const url = ossFile?.fileUrlProxy;

  const onChange: UploadProps['onChange'] = (
    info: UploadChangeParam<
      UploadFile<{
        data: TFile;
        code: number;
      }>
    >
  ) => {
    const { file } = info;
    if (file.status !== 'uploading') {
      // console.log(file);
    }
    if (file.status === 'done') {
      message.success(`${file.name} 文件上传成功`);
      if (file?.response && file?.response?.code == 200) {
        onVideoChange(file.response.data);
      }
    } else if (file.status === 'error') {
      message.error(`${file.name} 文件上传失败`);
    }
  };
  const beforeUpload = (file: FileType) => {
    if (file.type !== 'video/mp4') {
      message.error('请上传mp4格式的视频');
      return false;
    }
    if (!size.height || !size.width) {
      message.error('请设置视频尺寸');
      return false;
    }
    if (file.size > 1024 * 1024 * 100) {
      message.error('视频大小不能超过100M');
      return false;
    }
  };

  const uploadProps: UploadProps = {
    // listType: 'picture',
    accept: accept,
    action: '/api/oss/uploadFile',
    // customRequest,
    onChange,
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: false,
    },
    maxCount: 1,
    beforeUpload,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      dir: uploadOssPath,
      fileNameExtensionRequired: 'true',
    },
  };
  return (
    <div>
      <div>{platform}</div>
      <ImageUpload
        uploadOssPath={uploadOssPath}
        limitSize={10}
        isLimitCropSize={true}
        platform={platform}
        cropSize={size}
        ossFile={ossFilePoster}
        uploadButton={<div> 上传封面</div>}
        onImageChange={onVideoPosterChange}
      />

      {url && (
        <div className="video-upload-wrapper">
          <video
            src={url}
            style={{ width: '100%', height: '100%' }}
            contextMenu=""
            controlsList={'nodownload'}
            controls={true}
          >
            您的浏览器不支持 video 标签。
          </video>
        </div>
      )}
      <Upload {...uploadProps}>
        {uploadButton ? (
          uploadButton
        ) : (
          <Button type="primary" style={{ marginTop: '10px' }}>
            {url ? '更新视频' : '上传视频'}
          </Button>
        )}
      </Upload>
    </div>
  );
};
export default VideoUpload;
