export function splitArrayIntoChunks<T>(arr: Array<T>, chunkSize: number) {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}
