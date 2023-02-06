import { Pixel } from './types';

class Layer {
  id: string;
  width: number;
  height: number;
  pixels: string[];

  constructor(id: string, width: number, height: number, pixels: string[]) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  /**
   * Creates a new Layer filled with the specified color
   */
  static empty(id: string, width: number, height: number, color: string = '#f0f0f0'): Layer {
    return new Layer(id, width, height, new Array(width * height).fill(color));
  }

  /**
   * Returns the color at positon (x, y) on a Layer
   */
  pixel(x: number, y: number): string | undefined {
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