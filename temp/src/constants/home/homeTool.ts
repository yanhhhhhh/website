export const moduleList: Record<string, any> = import.meta.glob(
  '@/assets/images/home/scene/**/*.png',
  {
    eager: true,
  }
);

export function getHomeImageMap() {
  return Object.keys(moduleList).reduce((acc, key) => {
    //key 为@/assets/images/home/scene/**/*.png
    //根据key匹配scene后面的文件名
    const fileNames = key.match(/\/scene\/([^\\/]+)\//)![1];
    const name = key.match(/\/([^\\/]+)\.png$/)![1].replace(/-/, '') + 'Image';
    if (!acc[fileNames]) {
      acc[fileNames] = [];
    }
    acc[fileNames].push({
      [name]: moduleList[key].default,
    });

    return acc;
  }, {} as Record<string, Array<Record<string, string>>>);
}
