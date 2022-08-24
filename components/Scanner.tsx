import React from "react";
import Quagga from "quagga";

type ScannerProps = {
  onDetected: (result: any) => void;
};

class Scanner extends React.Component<ScannerProps> {
  private running = false;

  componentDidMount() {
    if (!this.running) {
      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              facingMode: "environment",
            },
          },
          frequency: 10,
          multiple: false,
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
          },
          locator: {
            halfSample: true,
            patchSize: "large", // x-small, small, medium, large, x-large
            debug: {
              showCanvas: true,
              showPatches: false,
              showFoundPatches: false,
              showSkeleton: false,
              showLabels: false,
              showPatchLabels: false,
              showRemainingPatchLabels: false,
              boxFromPatches: {
                showTransformed: false,
                showTransformedBox: false,
                showBB: false,
              },
            },
          },
          numOfWorkers: 4,
          decoder: {
            readers: ["code_128_reader"],
            debug: {
              drawBoundingBox: false,
              showFrequency: false,
              drawScanline: false,
              showPattern: false,
            },
          },
          locate: true,
        },
        function (err) {
          if (err) {
            return console.log(err);
          }
          Quagga.start();
        }
      );
      Quagga.onDetected(this._onDetected);
      this.running = true;
    }
  }

  componentWillUnmount() {
    Quagga.stop();
    Quagga.offDetected(this._onDetected);
  }

  clearDrawing = (drawingCtx, drawingCanvas) => {
    drawingCtx.clearRect(
      0,
      0,
      parseInt(drawingCanvas.getAttribute("width")),
      parseInt(drawingCanvas.getAttribute("height"))
    );
  };

  _onDetected = (result) => {
    this.props.onDetected(result);

    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    if (result) {
      if (result.box) {
        this.clearDrawing(drawingCtx, drawingCanvas);
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: "purple",
          lineWidth: 8,
        });
        setTimeout(() => {
          this.clearDrawing(drawingCtx, drawingCanvas);
        }, 2000);
      }
    }
  };

  render() {
    return (
      <div
        id="interactive"
        className="viewport scanner z-10 col-start-1 row-start-1 h-full w-full"
      >
        <video id="quagga-stream"></video>
      </div>
    );
  }
}

export default Scanner;
