import { RGBColor } from "react-color";
import Layer from "../Layer";
import { Pixel, PixelPosition } from "../types";
import { pointerPosition } from "../utils";

function circle(layer: Layer, pixel: Pixel, dispatch: (layer: Layer) => void) {
  let activeLayer = layer;
  const center = { x: pixel.x, y: pixel.y };
  const circleCallback = (pos: PixelPosition) => {
    const radius = Math.floor(Math.sqrt(
      Math.pow(pos.x - pixel.x, 2) + Math.pow(pos.y - pixel.y, 2)
    ));
    const toColor = [];
    let chord; // technically chord length / 2
    for (let y = center.y - radius; y <= center.y + radius; y++) {
      chord = Math.floor(Math.sqrt(
        Math.pow(radius, 2) - Math.pow(Math.abs(y - center.y), 2)
      ));
      if (chord == 0) continue; // to make the circle 'smoother'
      if (radius == chord) chord -= 1; // to make the circle 'smoother'
      for (let x = center.x - chord; x <= center.x + chord; x++) {
        if (x < 0 || x >= layer.width || y < 0 || y >= layer.height) continue;
        toColor.push({ x, y, color: pixel.color });
      }
    }
    dispatch(activeLayer.colorPixels(toColor));
  }
  circleCallback(center);
  return circleCallback;
}

function circleTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: (layer: Layer) => void) {
  let handleMouseMove: (moveEvent: any) => void;
  const handleMouseDown = (evt: MouseEvent) => {
    // evt.stopPropagation();
    if (evt.button == 0) {
      let pos = pointerPosition(canvas, evt, scale);
      if (!pos) return;
      const toolMoveFn = circle(layer, { ...pos, color }, dispatch);
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

export default circleTool;