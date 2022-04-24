import React from "react";
import "./Main.scss";
import { SketchField } from "../SketchField";
import Tools from "../../tools/";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { connect } from "react-redux";
import "react-color-palette/lib/css/styles.css";
import { HexColorPicker } from "react-colorful";

import axios from "axios";

import PaletteIcon from "@mui/icons-material/Palette";
import BrushIcon from "@mui/icons-material/Brush";
import RectangleIcon from "@mui/icons-material/Crop169";
import CircleIcon from "@mui/icons-material/CircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import EraserIcon from "../Eraser/Eraser";
import ClearIcon from "@mui/icons-material/DeleteForever";
import { Icon } from "@iconify/react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import AllScroll from "../AllScroll/AllScroll";
import ShareIcon from "@mui/icons-material/IosShare";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import io from "socket.io-client";
import Notification from "../Notification/Notification";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

class Main extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            width: '100vw',
            height: '90vh',
            value: '',
            defaultValue: '',
            changingBoard: false,
            loading: false,
            tool: Tools.Pencil,
            color: '#fff',
            showColorPicker: false,
            showEraserSlider: false,
            backgroundColor: 'transparent',
            active: 'Pencil',
            lineWidth: 3,
            eraserWidth: 30,

            showPencilOptions: false,
            socketConnected: false,
            shortUrl: '',

            iAmReciever: false,
            receiverConnected: false,
            joinError: '',
        }

        this.setColor = this.setColor.bind(this);
        this.sketchField = React.createRef();
        this.manipulateBoard = this.manipulateBoard.bind(this);
        this.toggleColorPicker = this.toggleColorPicker.bind(this);
        this.toggleEraserSlider = this.toggleEraserSlider.bind(this);
        this.togglePencilPanel = this.togglePencilPanel.bind(this);

        this.maxLength = 0;

        this.toolChange = this.toolChange.bind(this);
        this.undoStep = this.undoStep.bind(this);
        this.redoStep = this.redoStep.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.pencilClick = this.pencilClick.bind(this);
        this.eraserClick = this.eraserClick.bind(this);

        this.zoomListeners = this.zoomListeners.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.makeThisLive = this.makeThisLive.bind(this);
        this.connectWithSocket = this.connectWithSocket.bind(this);
        this.makeThisOffline = this.makeThisOffline.bind(this);
        this.isConnected = this.isConnected.bind(this);
        this.checkForSocketWatcher = this.checkForSocketWatcher.bind(this);

        this.socket = null;
    }

    getLocalStorageData() {

        this.setState({ loading: true });

        const data = localStorage.getItem('boardData')

        if (data) {

            this.setState({
                defaultValue: data,
            })

        }


        this.setState({ loading: false });

    }

    manipulateBoard() {

        const currentBoardData = this.sketchField.current?.toJSON()
        const dataLength = currentBoardData['objects'].length;
        const data = JSON.stringify(currentBoardData);

        // if(dataLength <= this.maxLength) return;

        // this.maxLength = dataLength;

        if (!this.state.iAmReciever)
            this.setState({
                value: data,
            })

        localStorage.setItem('boardData', data)

    }

    componentWillMount() {
        this.getLocalStorageData();
    }

    toolChange() {
        this.setState(prevState => ({
            tool: prevState.tool === Tools.Rectangle ? Tools.Pencil : Tools.Rectangle
        }))
    }

    undoStep() {
        console.log(this.sketchField.current)
        this.sketchField.current.undo()
    }

    redoStep() {
        this.sketchField.current.redo();
    }

    setColor(color) {
        // console.log('state-changed', color)
        this.setState({ color: color })
    }

    toggleColorPicker() {
        this.setState(prevState => ({
            showColorPicker: !prevState.showColorPicker
        }))
    }

    toggleEraserSlider() {
        this.setState(prevState => ({
            showEraserSlider: !prevState.showEraserSlider,
            tool: Tools.Pencil,
            active: 'Eraser'
        }))
    }
    togglePencilPanel(){
        this.setState(prevState => ({
            showPencilOptions: !prevState.showPencilOptions,
            tool: Tools.Pencil,
            active: 'Pencil'
        }))
    }

    clearBoard() {
        // this.sketchField.current.zoom(Number.MAX_SAFE_INTEGER)
        this.sketchField.current.clear();
        // const canvas = this.sketchField.current._canvas
        // const ctx = canvas.getContext('2d');
        // const currColor = this.props.theme === 'light' ? '#fff' : '#000';
        // ctx.fillStyle = currColor;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // console.log(ctx);
        // const currentBoardData = this.sketchField.current?.toJSON()
        // const data = JSON.stringify(currentBoardData);
        // this.sketchField.current._history?.current?.push(data)
        // console.log(this.sketchField.current);
        // this.sketchField.current._history.keep(currentBoardData);
        // this.sketchField.current._onObjectAdded(ctx);
    }

    pencilClick(event) {

        // if(this.state.active === 'Pencil') {
        //     return this.setState({showPencilOptions: true});
        // }

        // if(this.state.active === 'Rectangle') {
        //     return this.setState({showPencilOptions: false});
        // }
        this.setState({
            tool: Tools.Pencil,
            active: 'Pencil',
            lineWidth: parseInt(event.target.value)
        })
    }

    eraserClick(event) {
=======
  constructor(props) {
    super(props);

    this.state = {
      width: "100vw",
      height: "90vh",
      value: "",
      defaultValue: "",
      changingBoard: false,
      loading: false,
      tool: Tools.Pencil,
      color: "#fff",
      showColorPicker: false,
      showEraserSlider: false,
      backgroundColor: "transparent",
      active: "Pencil",
      lineWidth: 3,
      eraserWidth: 30,

      showPencilOptions: false,
      socketConnected: false,
      shortUrl: "",

      iAmReciever: false,
      receiverConnected: false,
      joinError: "",
    };

    this.setColor = this.setColor.bind(this);
    this.sketchField = React.createRef();
    this.manipulateBoard = this.manipulateBoard.bind(this);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.toggleEraserSlider = this.toggleEraserSlider.bind(this);
    this.maxLength = 0;

    this.toolChange = this.toolChange.bind(this);
    this.undoStep = this.undoStep.bind(this);
    this.redoStep = this.redoStep.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.pencilClick = this.pencilClick.bind(this);
    this.eraserClick = this.eraserClick.bind(this);

    this.zoomListeners = this.zoomListeners.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.makeThisLive = this.makeThisLive.bind(this);
    this.connectWithSocket = this.connectWithSocket.bind(this);
    this.makeThisOffline = this.makeThisOffline.bind(this);
    this.isConnected = this.isConnected.bind(this);
    this.checkForSocketWatcher = this.checkForSocketWatcher.bind(this);

    this.socket = null;
  }

  getLocalStorageData() {
    this.setState({ loading: true });

    const data = localStorage.getItem("boardData");

    if (data) {
      this.setState({
        defaultValue: data,
      });
    }

    this.setState({ loading: false });
  }

  manipulateBoard() {
    const currentBoardData = this.sketchField.current?.toJSON();
    const dataLength = currentBoardData["objects"].length;
    const data = JSON.stringify(currentBoardData);

    // if(dataLength <= this.maxLength) return;

    // this.maxLength = dataLength;

    if (!this.state.iAmReciever)
      this.setState({
        value: data,
      });

    localStorage.setItem("boardData", data);
  }

  componentWillMount() {
    this.getLocalStorageData();
  }

  toolChange() {
    this.setState((prevState) => ({
      tool: prevState.tool === Tools.Rectangle ? Tools.Pencil : Tools.Rectangle,
    }));
  }

  undoStep() {
    console.log(this.sketchField.current);
    this.sketchField.current.undo();
  }

  redoStep() {
    this.sketchField.current.redo();
  }

  setColor(color) {
    // console.log('state-changed', color)
    this.setState({ color: color });
  }

  toggleColorPicker() {
    this.setState((prevState) => ({
      showColorPicker: !prevState.showColorPicker,
    }));
  }

  toggleEraserSlider() {
    this.setState((prevState) => ({
      showEraserSlider: !prevState.showEraserSlider,
      tool: Tools.Pencil,
      active: "Eraser",
    }));
  }

  clearBoard() {
    // this.sketchField.current.zoom(Number.MAX_SAFE_INTEGER)
    this.sketchField.current.clear();
    // const canvas = this.sketchField.current._canvas
    // const ctx = canvas.getContext('2d');
    // const currColor = this.props.theme === 'light' ? '#fff' : '#000';
    // ctx.fillStyle = currColor;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // console.log(ctx);
    // const currentBoardData = this.sketchField.current?.toJSON()
    // const data = JSON.stringify(currentBoardData);
    // this.sketchField.current._history?.current?.push(data)
    // console.log(this.sketchField.current);
    // this.sketchField.current._history.keep(currentBoardData);
    // this.sketchField.current._onObjectAdded(ctx);
  }

  pencilClick() {
    // if(this.state.active === 'Pencil') {
    //     return this.setState({showPencilOptions: true});
    // }

    // if(this.state.active === 'Rectangle') {
    //     return this.setState({showPencilOptions: false});
    // }

    this.setState({ tool: Tools.Pencil, active: "Pencil" });
  }

  eraserClick(event) {
    this.setState({
      tool: Tools.Pencil,
      active: "Eraser",
      eraserWidth: parseInt(event.target.value),
    });
  }

  zoomListeners(event) {
    console.log(event);

    const zoomFactor = 0.9;

    if (event.deltaY > 0) this.sketchField.current?.zoom(zoomFactor);
    if (event.deltaY < 0) this.sketchField.current?.zoom(1 / zoomFactor);

    // this.setState({tool: Tools.Pan, active: 'Pan'})
  }

  zoomIn(event) {
    this.sketchField.current?.zoom(1 / 0.9);
  }

  zoomOut(event) {
    this.sketchField.current?.zoom(0.9);
  }

  componentDidMount() {
    const currentBoardData = this.sketchField.current?.toJSON();
    const dataLength = currentBoardData["objects"].length;
    const data = JSON.stringify(currentBoardData);

    window.addEventListener("wheel", this.zoomListeners);
    // this.sketchField.current._canvas.addEventListener('dblclick', (event)=> {
    //     console.log('2')
    //     this.setState({tool: Tools.Pencil, active: 'Pencil'})
    // })

    // setEventListeners();

    // console.log(currentBoardData)
    // console.log(this.sketchField.current._fc);

    this.checkForSocketWatcher();
  }

  async makeThisLive() {
    const currName =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const shortUrl = (
      await axios.post("http://localhost:4000/api/v1/share", {
        name: currName,
      })
    ).data.shortUrl;

    this.connectWithSocket(shortUrl);
  }

  isConnected(message) {
    if (message === true) return this.setState({ receiverConnected: true });

    this.setState({ joinError: message });
  }

  joinWithSocket = (shortUrl) => {
    this.socket.emit(
      "join",
      {
        userName: "Anonymous",
        boardLink: shortUrl,
      },
      (message) => this.isConnected(message)
    );
  };

  connectWithSocket(shortUrl) {
    this.socket = io("http://localhost:4000", { transports: ["websocket"] });

    this.socket.on("connect", () => {
      console.log("connected");

      if (this.state.iAmReciever === true)
        this.setState({
          socketConnected: true,
        });
      else
        this.setState({
          socketConnected: true,
          shortUrl: `${window.location.origin}/${shortUrl}`,
        });

      if (this.state.iAmReciever === true) {
        this.joinWithSocket(shortUrl);
      }
    });

    this.socket.on("disconnect", () => {
      this.setState({
        socketConnected: false,
      });
      console.log("disconnected");
    });

    if (this.state.iAmReciever === true) {
      this.socket.on("white-user", (data) => {
        this.setState({ value: data });
      });
    }
  }

  makeThisOffline() {
    this.socket.disconnect();
    this.setState({
      socketConnected: false,
    });
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.zoomListeners);

    if (this.socket) {
      this.makeThisOffline();
    }
  }

  checkForSocketWatcher() {
    const currUrl = window.location.pathname.split("/")[1];

    if (currUrl.length === 0) return;

    this.setState({ iAmReciever: true }, () => this.connectWithSocket(currUrl));
  }

  render() {
    let currLineColor, currLineWidth;

    if (!this.state.iAmReciever)
      this.socket?.emit("white-user", this.state.value);

    if (this.state.active !== "Eraser") currLineColor = this.state.color;
    else currLineColor = "#000";

    if (this.state.active !== "Eraser") currLineWidth = this.state.lineWidth;
    else currLineWidth = this.state.eraserWidth;

    const currTool = this.state.receiverConnected
      ? Tools.Select
      : this.state.tool;
    console.log(this.state.iAmReciever);
    const whiteboard = (
      <SketchField
        ref={this.sketchField}
        width={this.state.width}
        height={this.state.height}
        tool={currTool}
        lineColor={currLineColor}
        // lineColor={this.state.brushConfig.lineColor}
        // lineWidth={this.state.lineWidth}
        // lineWidth = {this.state.brushConfig.lineWidth}
        lineWidth={currLineWidth}
        className={"whiteboard"}
        style={{
          cursor:
            this.state.active === "Eraser"
              ? "url('cursors/Eraser.svg'), auto"
              : "crosshair",
        }}
        undoSteps={30}
        value={this.state.iAmReciever ? this.state.value : null}
        disabled={this.state.iAmReciever}
        // defaultValue={this.state.defaultValue}
        // backgroundColor={this.props.theme === 'light' ? '#fff' : '#000'}
        backgroundColor={"#000"}
        onChange={this.manipulateBoard}
      />
    );
    return (
      <div className="main">
        <div
          className="whiteboard__header"
          style={{ backgroundColor: "#363d48" }}
        >
          <ShareIcon
            className={`header--item ${
              this.state.socketConnected ? "shareIcon--active" : ""
            }`}
            onClick={this.makeThisLive}
          />
          <CancelPresentationIcon
            className={`header--item ${
              this.state.socketConnected
                ? "stopIcon--active"
                : "stopIcon--disabled"
            }`}
            onClick={this.makeThisOffline}
          />
          {!this.state.receiverConnected && (
            <>
              <span
                className={`header--item ${
                  this.state.active === "Pencil" && "item--active"
                }`}
              >
                <BrushIcon onClick={this.pencilClick} />
                {/* { this.state.showPencilOptions && <span></span>} */}
              </span>
              <span className="eraser__container">
                <EraserIcon
                  icon="mdi:eraser"
                  onClick={this.toggleEraserSlider}
                  className={`header--item`}
                />
                {this.state.showEraserSlider && (
                  <span className="eraser__slider">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={this.state.eraserWidth}
                      onChange={this.eraserClick}
                    />
                  </span>
                )}
              </span>
              <RectangleIcon
                className={`header--item ${
                  this.state.active === "Rectangle" && "item--active"
                }`}
                onClick={() => {
                  this.setState({ tool: Tools.Rectangle, active: "Rectangle" });
                }}
                undoSteps={30}
                value={this.state.iAmReciever ? this.state.value : null}
                disabled={this.state.iAmReciever}
                // defaultValue={this.state.defaultValue}
                // backgroundColor={this.props.theme === 'light' ? '#fff' : '#000'}
                backgroundColor={'#000'}
                onChange={this.manipulateBoard}

            />
        )
        return (
            <div className='main'>
                <div className='whiteboard__header' style={{ backgroundColor: '#363d48' }}>
                    <ShareIcon className={`header--item ${this.state.socketConnected ? "shareIcon--active" : ""}`} onClick={this.makeThisLive} />
                    <CancelPresentationIcon className={`header--item ${this.state.socketConnected ? "stopIcon--active" : "stopIcon--disabled"}`} onClick={this.makeThisOffline} />
                    {!this.state.receiverConnected && <>
                        <span className="pencil__container" >
                            <BrushIcon  onClick = {this.togglePencilPanel} className={`header--item`} />
                                { this.state.showPencilOptions &&<span className='pencil__slider'><input type="range" min="1" max="100" value={this.state.lineWidth} onChange={this.pencilClick} /></span>}
                        </span>
                        <span className="eraser__container">
                            <EraserIcon icon="mdi:eraser" onClick={this.toggleEraserSlider} className={`header--item`} />
                            {this.state.showEraserSlider && <span className='eraser__slider'><input type="range" min="1" max="100" value={this.state.eraserWidth} onChange={this.eraserClick} /></span>}
                        </span>
                        <RectangleIcon className={`header--item ${this.state.active === 'Rectangle' && 'item--active'}`} onClick={() => { this.setState({ tool: Tools.Rectangle, active: 'Rectangle' }) }} />
                        <CircleIcon className={`header--item ${this.state.active === 'Circle' && 'item--active'}`} onClick={() => { this.setState({ tool: Tools.Circle, active: 'Circle' }) }} />
                        <span className="color__picker">
                            <PaletteIcon onClick={this.toggleColorPicker} className='header--item' />
                            {this.state.showColorPicker && <HexColorPicker className='color__palette' color={this.state.color} onChange={this.setColor} />}
                        </span>
                        <ClearIcon className='header--item' onClick={this.clearBoard} />
                        <UndoIcon onClick={this.undoStep} className='undo header--item' />
                        <RedoIcon onClick={this.redoStep} className='redo header--item' /></>}
                    <ZoomInIcon className={`header--item`} onClick={this.zoomIn} />
                    <ZoomOutIcon className={`header--item`} onClick={this.zoomOut} />
                </div>
                {whiteboard}
                {this.state.shortUrl && <Notification data={"Here is the shorten url: "} shortenUrl={this.state.shortUrl} />}
                {this.state.joinError && <Notification data={this.state.joinError} joinError />}
            </div>
        )
    }
=======
              />
              <CircleIcon
                className={`header--item ${
                  this.state.active === "Circle" && "item--active"
                }`}
                onClick={() => {
                  this.setState({ tool: Tools.Circle, active: "Circle" });
                }}
              />
              <span className="color__picker">
                <PaletteIcon
                  onClick={this.toggleColorPicker}
                  className="header--item"
                />
                {this.state.showColorPicker && (
                  <HexColorPicker
                    className="color__palette"
                    color={this.state.color}
                    onChange={this.setColor}
                  />
                )}
              </span>
              <ClearIcon className="header--item" onClick={this.clearBoard} />
              <UndoIcon
                onClick={this.undoStep}
                key={"a"}
                className="undo header--item"
              />
              <RedoIcon onClick={this.redoStep} className="redo header--item" />
            </>
          )}
          <ZoomInIcon className={`header--item`} onClick={this.zoomIn} />
          <ZoomOutIcon className={`header--item`} onClick={this.zoomOut} />
          <FileDownloadIcon
            className={`header--item`}
            onClick={() => exportComponentAsPNG(this.sketchField)}
          />
        </div>
        {whiteboard}
        {this.state.shortUrl && (
          <Notification
            data={"Here is the shorten url: "}
            shortenUrl={this.state.shortUrl}
          />
        )}
        {this.state.joinError && (
          <Notification data={this.state.joinError} joinError />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(state)
  return {
    theme: state.theme,
  };
}

export default connect(mapStateToProps, {})(Main);
