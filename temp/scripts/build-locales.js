import { readdirSync, writeFileSync } from 'fs';
import path from 'path';
import { LanguagesMap, defaultLanguage } from './languagesMap.js';
const args = process.argv;
const pathname = path.resolve() + args[2];
//写入文件名称
const writeFileName = path.resolve() + args[3]; // /src/constants/locales.ts
async function getLocalesList() {
  const localesList = await readdirSync(pathname, {
    encoding: 'utf-8',
  })
    .filter((name) => name.endsWith('.json'))
    .map((name) => {
      return {
        name: name.replace('.json', ''),
        path: pathname + name,
      };
    });
  return localesList;
}
// console.log(localesList)
async function writeFile(localesList) {
  //遍历localesList 生成文件ts文件
  let fileContent = '';
  let imports = '';
  let resources = 'export const resources = {\n';
  let languages =
    'export const languages: {\n  key: string;\n  short: string;\n  long: string;\n}[] = [\n';

  localesList.forEach((locale, index) => {
    const { short, long } = LanguagesMap[locale.name] || defaultLanguage;

    const variableName = locale.name;
    const importName = locale.name.split('_').join('');
    const importPath = `@/assets/jsons/locales/${locale.name}.json`;

    // Generate import statements
    imports += `import ${importName} from '${importPath}';\n`;

    // Populate resources object
    resources += `  '${variableName}': {\n    translation: ${importName},\n  },\n`;

    // Populate languages array
    languages += `  { key: '${variableName}', short: '${short}', long: '${long}' },\n`;
  });

  resources += '};\n';
  languages += '];\n';

  fileContent += imports + resources + languages;

  // The 'fileContent' variable now contains the generated TypeScript code
  // You would use a method to write 'fileContent' to a .ts file here

  //写入文件
  await writeFileSync(writeFileName, fileContent);
}
async function main() {
  const localesList = await getLocalesList();
  console.info('写入文件路径:', writeFileName);
  writeFile(localesList);
  console.info('写入文件成功!!!');
}
main();
