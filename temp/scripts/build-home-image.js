import fs from 'fs';
import path from 'path';

// 读取文件夹 /images/home/scene/下的所有文件 的png 文件
const pathname = path.resolve() + '/public/images/home/scene/';
const writeFileName = path.resolve() + '/src/constants/home/homeImageMap.ts';
async function getList() {
  const list = await fs
    .readdirSync(pathname, {})
    .filter((name) => name.endsWith('.png'))
    .map((name) => {
      console.log(name);
      return {
        name: name.replace('.png', ''),
        path: pathname + name,
      };
    });
  return list;
}
// 递归函数，用于遍历文件夹并找到所有的PNG文件

let pngFilesMap = {};
async function findAllPngFiles(dirPath, parentPath = '') {
  const entries = await fs.readdirSync(dirPath, { withFileTypes: true });
  // 遍历当前文件夹中的每个条目（文件或文件夹）
  for (const entry of entries) {
    const entryPath = path.resolve(dirPath, entry.name);
    if (entry.isDirectory()) {
      // 如果是文件夹，则递归调用此函数
      await findAllPngFiles(entryPath, entry.name);
    } else if (path.extname(entry.name).toLowerCase() === '.png') {
      // 如果是PNG文件，则添加到列表中
      const regex = /\/images.*$/;
      const matched = entryPath.match(regex)[0];

      const fileName =
        entry.name.replace('.png', '').replace('-', '') + 'Image';
      if (!pngFilesMap[parentPath]) {
        pngFilesMap[parentPath] = { [fileName]: matched };
      } else {
        pngFilesMap[parentPath][fileName] = matched;
      }
    }
  }

  return pngFilesMap;
}
async function main() {
  const list = await findAllPngFiles(pathname);
  console.log('读取/public/images/home/scene/ 下的图片');

  let fileContent =
    'export const homeImage = \n' + JSON.stringify(list) + ';\n';
  await fs.writeFileSync(writeFileName, fileContent);
  console.log('写入文件成功！！');
}
main();
//生成如下的ts文件内容
