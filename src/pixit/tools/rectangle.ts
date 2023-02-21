import { RGBColor } from "react-color";
import Layer from "../Layer";
import { Pixel, PixelPosition } from "../types";
import { pointerPosition } from "../utils";

function rectangle(layer: Layer, pixel: Pixel, dispatch: (layer: Layer) => void) {
  const activeLayer = layer;
  const rectCallback = (pos: PixelPosition) => {
    const startX = Math.min(pixel.x, pos.x);
    const startY = Math.min(pixel.y, pos.y);
    const endX = Math.max(pixel.x, pos.x);
    const endY = Math.max(pixel.y, pos.y);
    const toColor = [];
    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        toColor.push({ x, y, color: pixel.color});
      }
    }
    dispatch(activeLayer.colorPixels(toColor));
  }
  rectCallback({ x: pixel.x, y: pixel.y });
  return rectCallback;
}

function rectTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: (layer: Layer) => void) {
  let handleMouseMove: (moveEvent: any) => void;
  const handleMouseDown = (evt: MouseEvent) => {
    // evt.stopPropagation();
    if (evt.button == 0) {
      let pos = pointerPosition(canvas, evt, scale);
      if (!pos) return;
      const toolMoveFn = rectangle(layer, { ...pos, color }, dispatch);
      handleMouseMove = (moveEvent: any) => {
        if (moveEvent.buttons != 1) {
          canvas.removeEventListener('mousemove', handleMouseMove);
        } else {
          const newPos = pointerPosition(canvas, moveEvent, scale);
          if (!newPos || !pos) return;
          if (pos.x == newPos.x && pos.y == newPos.y) return;
          toolMoveFn(newPos);
          pos = newPos;
        }
      }
      canvas.addEventListener('mousemove', handleMouseMove);
    }
  };
  const handleMouseLeave = (evt: MouseEvent) => {
    evt.stopPropagation();
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mousedown', handleMouseDown);
  }
  const handleMouseEnter = (evt: MouseEvent) => {
    evt.stopPropagation();
    canvas.addEventListener('mousedown', handleMouseDown);
  }
  const removeEventListeners = () => {
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
    canvas.removeEventListener('mouseenter', handleMouseEnter);
  }
  return {
    handleMouseDown,
    handleMouseLeave,
    handleMouseEnter,
    removeEventListeners,
  };
}

export default rectTool;