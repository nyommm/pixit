import { Pixel } from './types';
import { RGBColor } from 'react-color';

class Layer {
  id: string;
  width: number;
  height: number;
  pixels: RGBColor[];

  static DEFAULT_COLOR: RGBColor = { r: 0, g: 0, b: 0, a: 0 };

  constructor(id: string, width: number, height: number, pixels: RGBColor[]) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  /**
   * Creates a new Layer filled with the specified color
   */
  static empty(id: string, width: number, height: number, color: RGBColor = Layer.DEFAULT_COLOR): Layer {
    return new Layer(id, width, height, new Array(width * height).fill(color));
  }

  /**
   * Returns the color at positon (x, y) on a Layer
   */
  pixel(x: number, y: number): RGBColor | undefined {
    if (x < this.width && y < this.height)
      return this.pixels[x + (y * this.width)];
  }

  /**
   * Paints the pixels on the Layer with the specified color
   */
  colorPixels(pixels: Pixel[]) {
    const copy = this.pixels.slice();
    for (const { x, y, color } of pixels) {
      copy[x + (y * this.width)] = color;
    }
    return new Layer(this.id, this.width, this.height, copy);
  }
}

export default Layer;