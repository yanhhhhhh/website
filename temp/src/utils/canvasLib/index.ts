import { clamp } from './utils';
import { Crood } from './type';


interface Opt {
  canvas: HTMLCanvasElement;

}
class CanvasLib {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  stageRect: DOMRect;


  constructor(public opt: Opt) {
    const { canvas } = opt;
    if (!canvas) {
      console.error(`参数缺少canvas`);
    }
    
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.stageRect = canvas.getBoundingClientRect();
    this.canvas = canvas;
  }

  clearFrame () {
    const { width, height } = this.stageRect;
    this.context.clearRect(0, 0, width, height);
  }

  drawImage (image: HTMLImageElement, x: number, y: number, width: number, height: number, options?: {
    backgroundColor?: string;
    focusPoint?: Crood | undefined;
    originalHeight?: number;
    customWH?: {
      width: number;
      height: number;
    }
  }) {
    const o = options;

    if (o?.backgroundColor) {
      this.context.save();
      this.context.fillStyle = o?.backgroundColor;
      this.context.fillRect(x, y, width, height);
      this.context.restore();
    }

    let focusPoint = o?.focusPoint;

    const actualSize = this.getImageaAtualSize(image);
    const scale = Math.max(
      width / actualSize.width,
      height / actualSize.height
    ) || 1;

    const scaledSize = {
      width: actualSize.width * scale,
      height: actualSize.height * scale
    };

    if (focusPoint) {
      // Since image hints are relative to image "original" dimensions (original != actual),
      // use the original size for focal point cropping.
      if (options?.originalHeight) {
        focusPoint.x *= (actualSize.height / options.originalHeight);
        focusPoint.y *= (actualSize.height / options.originalHeight);
      }
    } else {
      // Default focal point to [0.5, 0.5]
      focusPoint = {
        x: actualSize.width * 0.5,
        y: actualSize.height * 0.5
      };
    }

    // Clip the image to rectangle (sx, sy, sw, sh).
    const sx = Math.round(clamp(width * 0.5 - focusPoint.x * scale, width - scaledSize.width, 0)) * (-1 / scale);
    const sy = Math.round(clamp(height * 0.5 - focusPoint.y * scale, height - scaledSize.height, 0)) * (-1 / scale);
    const sw = Math.round(actualSize.width - (sx * 2));
    const sh = Math.round(actualSize.height - (sy * 2));

    // Scale the image to dimensions (dw, dh).
    const dw = Math.round(width);
    const dh = Math.round(height);

    // Draw the image on the canvas at coordinates (dx, dy).
    const dx = Math.round(x);
    const dy = Math.round(y);
    this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  getImageaAtualSize (img: HTMLImageElement): Record<'width' | 'height', number>  | never{
    if (!typeof Image) {
      console.error('图片类型不对');
    }
    return {
      width: img.naturalWidth,
      height: img.naturalHeight
    }
  }

  drawLinearGradient(colors: [string, string], rect?: {
    x0: number,
    y0: number, 
    x1: number, 
    y1: number
  }) {
    const { width, height } = this.stageRect;

    const {
      x0,
      y0, 
      x1, 
      y1
    } = rect || {
      x0: 0,
      y0: 0, 
      x1: width, 
      y1: height
    }
    this.clearFrame();
    const l = this.context.createLinearGradient(x0, y0, x1, y1);
    l.addColorStop(0, colors[0]);
    l.addColorStop(1, colors[1]);
    this.context.fillStyle = l;
    this.context.fillRect(x0, y0, x1, y1);
  }


}

export default CanvasLib;
