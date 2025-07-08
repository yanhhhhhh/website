/**
 * 支持序列化函数、undefined、日期、正则表达式、循环引用
 * @param data
 * @returns {string}
 */
export function jsonStringify(data: any): string {
  /*  const seen = new WeakMap<any, number>();
  let idCounter = 0; */

  return JSON.stringify(
    data,
    function (key: string, value: any) {
      if (typeof value === 'function') {
        return `__FUNC__${value.toString()}`;
      }
      if (value === undefined) {
        return '__UNDEFINED__';
      }
      if (value instanceof RegExp) {
        return `__REGEXP__${value.toString()}`;
      }
      if (value instanceof Date) {
        return `__DATE__${value.toISOString()}`;
      }
      // 循环引用
      /*  if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return `__CIRCULAR__${seen.get(value)}`;
      }
      const id = idCounter++;
      seen.set(value, id);
      (value as any).__id__ = id; 
    } */
      return value;
    },
    2
  );
}

/**
 * 解析序列化函数、undefined、日期、正则表达式、循环引用
 * @param data
 * @returns {any}
 */
export function jsonParse<T>(data: string): T {
  try {
    // const circularRefs: { key: string; id: number }[] = [];
    const revived = JSON.parse(data, function (key: string, value: any) {
      if (typeof value === 'string' && value.startsWith('__FUNC__')) {
        const funcBody = value.slice(8); //去掉__FUNC__
        return new Function(`return ${funcBody}`)();
      }
      if (value === '__UNDEFINED__') {
        return undefined;
      }
      if (typeof value === 'string' && value.startsWith('__REGEXP__')) {
        //value.slice(10) 去掉__REGEXP__
        const match = value.slice(10).match(/\/(.*)\/([gimsuy]*)/);
        if (match) {
          return new RegExp(match[1], match[2]);
        }
      }
      if (typeof value === 'string' && value.startsWith('__DATE__')) {
        //value.slice(8) 去掉__DATE__
        return new Date(value.slice(8));
      }
      /* if (typeof value === 'string' && value.startsWith('__CIRCULAR__')) {
      const id = parseInt(value.slice(12), 10);
      circularRefs.push({ key, id });
      return null;
    } */
      return value;
    });

    // 修复循环引用
    /*   const idMap = new Map<number, any>();
  (function mapIds(obj: any) {
    if (obj && typeof obj === 'object') {
      if ('__id__' in obj) {
        idMap.set(obj.__id__, obj);
        delete obj.__id__;
      }
      for (const key in obj) {
        mapIds(obj[key]);
      }
    }
  })(revived);

  circularRefs.forEach(({ key, id }) => {
    const path = key.split('.');
    let target = revived;
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]];
    }
    target[path[path.length - 1]] = idMap.get(id);
  }); */

    return revived;
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return {} as T;
  }
}
