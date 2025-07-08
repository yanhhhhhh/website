import { GetProp, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { UploadProps } from 'antd';

import { TFile } from '@/api/file';
import { TPlatform } from '@/pages/editor/type';
import { message } from '@/providers';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import './index.less';
import { isEmptyObject } from '@/pages/editor/utils';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface ImageUploadProps {
  uploadButton?: ReactNode; //上传静态资源组件

  platform?: TPlatform;
  isLimitCropSize?: boolean; //是否限制裁剪尺寸 默认不限制
  cropSize: { width: number; height: number };
  ossFile?: TFile | TFile[]; //oss文件
  limitSize: number; //限制文件大小,单位M
  onImageChange: (info?: TFile) => void;
  uploadOssPath: string;
  maxCount?: number;
}
const accept = '.jpg,.png,.jpeg,.webp';
export const ImageUpload: FC<ImageUploadProps> = (props) => {
  const {
    uploadButton,
    limitSize,
    isLimitCropSize = false,
    cropSize,
    ossFile,
    onImageChange,
    uploadOssPath,
    maxCount = 1,
  } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (ossFile && !isEmptyObject(ossFile)) {
      const fileList = Array.isArray(ossFile) ? ossFile : [ossFile];
      setFileList(
        fileList.map((item) => {
          return {
            uid: item.fileManageId,
            name: item.fileName,
            status: 'done',
            url: item.fileUrlProxy,
            response: {
              data: item,
              code: 200,
            },
          };
        })
      );
    } else {
      setFileList([]);
    }
  }, [ossFile]);
  const onChange: UploadProps['onChange'] = (
    info: UploadChangeParam<
      UploadFile<{
        data: TFile;
        code: number;
      }>
    >
  ) => {
    const { file, fileList } = info;
    if (file.status === 'done') {
      message.success(`${file.name} 文件上传成功`);
      if (file?.response && file?.response?.code == 200) {
        onImageChange(file.response.data);
      }
    }
    if (file.status === 'removed') {
      onImageChange(undefined);
    }
    if (file.status === 'error') {
      message.error(`${file.name} 文件上传失败`);
    }
    setFileList(fileList);
  };

  const beforeUpload = (file: FileType) => {
    if (isLimitCropSize && (!cropSize || !cropSize.width || !cropSize.height)) {
      message.error('请设置裁剪尺寸');
      return false;
    }
    if (file.size > 1024 * 1024 * limitSize) {
      message.error(`文件大小不能超过M${limitSize}`);
      return false;
    }
    return true;
  };
  const aspect = useMemo(() => {
    if (isLimitCropSize) {
      return cropSize.width / cropSize.height;
    }
    return 1;
  }, [isLimitCropSize, cropSize.width, cropSize.height]);

  const uploadProps: UploadProps = {
    listType: 'picture-card',
    accept: accept,
    action: '/api/oss/uploadFile',

    onChange,
    showUploadList: {
      showDownloadIcon: false,
    },
    fileList,

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
    <ImgCrop rotationSlider aspect={aspect}>
      <Upload {...uploadProps}>
        {fileList.length >= maxCount ? null : uploadButton ? (
          uploadButton
        ) : (
          <div className="upload-button">上传图片</div>
        )}
      </Upload>
    </ImgCrop>
  );
};
export default ImageUpload;
