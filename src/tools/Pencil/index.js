import FabricCanvasTool from "../fabrictool";
import { SvgIcon as MuiSvgIcon, styled } from '@mui/material';

class Pencil extends FabricCanvasTool {
  configureCanvas(props) {
    this._canvas.isDrawingMode = true;
    this._canvas.freeDrawingBrush.width = props.lineWidth;
    this._canvas.freeDrawingBrush.color = props.lineColor;
  }
}

export default Pencil;
