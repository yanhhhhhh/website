import { notification } from '@/providers';
import request, { Result, authRequest } from '@/request';
import { AxiosProgressEvent } from 'axios';

// 根据文件id获取下载链接
export const getDownloadUrlById = (id: string) => {
  return `${import.meta.env.VITE_APP_BASE_API}/oss/downloadById?id=${id}`;
};

export interface TFile {
  fileUrl: string;
  dir: null;
  signType: null;
  signContent: null;
  fileType: string;
  fileName: string;
  downloadPath: string;
  fileSize: number;
  fileManageId: string;
  bucketName: string;
  fileUrlProxy: string;
}

export const getFile = async (id: string) => {
  // 使用 fetch API 发起 POST 请求
  return request.post<Result<TFile>>(
    '/oss/downloadFileById',
    {},
    {
      params: {
        id,
      },
    }
  );
};
export const download = (url: string, fileName: string) => {
  const a = document.createElement('a');
  const key = fileName + new Date().getTime();

  notification.open({
    key: key,
    message: `${fileName} 下载中`,
    duration: null,
  });
  a.style.display = 'none';
  document.body.appendChild(a);

  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      notification.destroy(key);
    });

  // a.click();
};

// 新版统一文件下载
/**
 *
 * @param file
 * @param dir 文件上传的目录 ，需要以 / 结尾
 * @param onUploadCall
 * @returns
 */
export const uploadFileToOSS = (
  file: File,
  dir: string, // 上传文件的目录: pageManage/ 、templateManage/
  onUploadCall?: (event: AxiosProgressEvent) => void
) => {
  const data = new FormData();
  data.append('file', file);
  data.append('dir', dir);
  data.append('fileNameExtensionRequired', 'true');
  return authRequest.post<Result<TFile>>('/oss/uploadFile', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (onUploadCall) {
        onUploadCall(progressEvent);
      }
    },
  });
};
export const deleteOssFile = (ids: string[]) => {
  return authRequest.post<Result<boolean>>(
    '/oss/deleteFileBatch',
    {},
    {
      params: {
        fileIdList: ids.join(','),
      },
    }
  );
};
