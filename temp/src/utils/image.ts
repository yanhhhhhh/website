export interface ImageDetails {
  width: number;
  height: number;
  size: number; // 文件大小，以字节为单位
}

export function getImageDetails(file: File): Promise<ImageDetails> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          size: file.size,
        });
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = event.target?.result as string;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
