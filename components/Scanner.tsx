import React, {
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
} from "react";
import Quagga from "quagga";

type ScannerProps = {
  active: boolean;
  onDetected: (result: any) => void;
};

const Scanner: React.FC<ScannerProps> = (props) => {
  const { onDetected, active } = props;

  const drawBoxOverlay = useCallback((result) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    if (result) {
      if (result.box) {
        clearDrawing(drawingCtx, drawingCanvas);
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: "purple",
          lineWidth: 8,
        });
        setTimeout(() => {
          clearDrawing(drawingCtx, drawingCanvas);
        }, 2000);
      }
    }
  }, []);

  const handleDetected = useCallback(
    (result) => {
      drawBoxOverlay(result);
      onDetected(result);
    },
    [onDetected, drawBoxOverlay]
  );

  useEffect(() => {
    if (active) {
      console.log("on");
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

      Quagga.onDetected(handleDetected);
    } else {
      try {
        Quagga.stop();
        Quagga.offDetected(handleDetected);
      } catch (e) {}
    }
  }, [active]);

  const clearDrawing = (drawingCtx, drawingCanvas) => {
    drawingCtx.clearRect(
      0,
      0,
      parseInt(drawingCanvas.getAttribute("width")),
      parseInt(drawingCanvas.getAttribute("height"))
    );
  };

  return (
    <div
      className={`scanner mx-auto h-auto w-full max-w-lg ${
        !active && "!hidden"
      }`}
    >
      <div
        id="interactive"
        className="viewport scanner z-10 col-start-1 row-start-1 h-full w-full"
      >
        <video id="quagga-stream"></video>
      </div>
      <div className="btn loading btn-square col-start-1 row-start-1 mx-auto my-auto rounded-full border-none bg-transparent text-neutral before:!h-8 before:!w-8 before:!border-4 before:!border-x-neutral"></div>
    </div>
  );
};
export default Scanner;
