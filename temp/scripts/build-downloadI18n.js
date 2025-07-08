import JSZip from 'jszip';
import axios from 'axios';
import path from 'path';
import { writeFileSync } from 'fs';

// const defalutBaseUrl = 'http://172.24.73.23:9200';
const defalutBaseUrl = 'https://www.hero-ee.com/api';
const baseUrl = defalutBaseUrl;
console.log('baseUrl:', baseUrl);

const __dirname = path.resolve();
const args = process.argv;
const savePath = __dirname + args[2];
console.log('savePath:', savePath);

// 下载文件
download();

function download() {
  const query = {
    serviceName: 'product-intro',
    languagesFormatEnum: 'I18N',
    downLanguages: [
      'zh_CN',
      // "zh_HK",
      // "zh_TW",
      'en_US',
      // "vi_VN",
      // "ms_MY",
      // "th_TH",
      // "km_KH",
      // "ur_PK",
      // "hi_IN",
      // "ar_EG",
      // "sw_TZ",
      // "sw_KE",
      // "en_NG"
    ],
  };

  const url =
    baseUrl +
    '/hero-i18n/internationalization/downloadLanguageFile?serviceName=' +
    query.serviceName +
    '&languagesFormatEnum=' +
    query.languagesFormatEnum +
    '&downLanguages=' +
    query.downLanguages.join(',');
  console.log('下载地址:', url);
  startDownload(url);
}

async function downloadZip(url) {
  // 使用axios获取zip文件的数据
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  // 返回zip文件数据
  return data;
}

async function unzip(zipData) {
  // 使用jszip将zip文件转换成对象
  const zip = await JSZip.loadAsync(zipData);
  // 使用Promise.all方法，获取zip文件中的内容
  const files = await Promise.all(
    Object.keys(zip.files).map(async (filename) => {
      const file = zip.files[filename];
      const content = await file.async('nodebuffer');
      // 返回文件对象
      return {
        filename,
        content,
      };
    })
  );
  // 返回文件对象数组
  return files;
}

async function startDownload(url) {
  console.log('\n开始下载~~~\n');
  let fileData = await downloadZip(url);
  console.log('下载成功~~~\n');
  console.log('开始解压~~~\n');
  let filepath = await unzip(fileData);
  console.log('解压成功~~~\n');
  console.log('开始写入~~~\n');
  let filePaths = filepath.filter((item) => !item.filename.endsWith('/'));
  const prefixPath = path.resolve(__dirname, savePath);
  // 上传文件夹文件
  filePaths.forEach(async (item) => {
    if (!item.filename.endsWith('/')) {
      let targetPathFile = path.resolve(prefixPath, `${item.filename}`);
      // 检测是否为 JSON 文件，格式化 JSON
      if (item.filename.endsWith('.json')) {
        try {
          const jsonContent = JSON.parse(item.content.toString());
          item.content = Buffer.from(JSON.stringify(jsonContent, null, 2)); // 格式化 JSON（2 空格缩进）
        } catch (error) {
          console.error(`JSON 解析失败: ${item.filename}`, error);
        }
      }

      await writeFileSync(targetPathFile, item.content);
    }
  });
  console.log('写入成功~~~\n');
}
