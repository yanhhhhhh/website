// url 转义,空格转义（包含空格变量赋值有问题）
export function urlEncode(str?: string) {
  if (!str) {
    return '';
  }
  return encodeURI(str);
}
