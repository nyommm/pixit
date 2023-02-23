import { RGBColor } from 'react-color';
import Layer from '../Layer';
import { DispatchFn } from '../types';
import { pointerPosition } from '../utils';

function clickTool(tool: Function, canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn) {
  const handleMouseDown = (evt: MouseEvent) => {
    if (evt.button == 0) {
      const pos = pointerPosition(canvas, evt, scale);
      if (!pos) return;
      tool(layer, { ...pos, color }, dispatch);
    }
  };
  const removeEventListeners = () => {
    canvas.removeEventListener('mousedown', handleMouseDown);
  }
  return {
    handleMouseDown,
    removeEventListeners,
  };
}

export default clickTool;