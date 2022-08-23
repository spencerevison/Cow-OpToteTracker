import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMachine } from "@xstate/react";
import ToteId from "./ToteId";
import Alert from "./Alert";
import { incomingFormMachine } from "../machines/incoming";
import Camera from "../assets/svg/camera.svg";
import CameraSlash from "../assets/svg/camera-slash.svg";
import Scanner from "./Scanner";

interface FormInputs {
  customerName: string;
  orderId: string;
  toteId: string;
}

const IncomingForm = () => {
  const [qrData, setQrData] = useState("");
  const [useCam, setUseCam] = useState(false);
  const scannerRef = useRef(null);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const [state, send] = useMachine(incomingFormMachine, {
    actions: {
      resetForm: () => {
        reset();
      },
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data.toteId);
    send({
      type: "SUBMIT",
      toteId: data.toteId,
    });
  };

  const showProgress = ["fetchRecord", "deletingRecord"].some(state.matches);

  return (
    <>
      <h1 className="text-xl sm:text-2xl">Log Incoming Totes</h1>
      <progress
        className={`progress mx-auto my-1 block w-56 md:my-4 ${
          !showProgress && "opacity-0"
        }`}
      ></progress>
      <Alert msg={state.context.msg} status={state.context.alertStatus} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToteId {...{ register, errors, qrData }} />

        <div className="mx-auto my-4 flex max-w-[350px] flex-wrap items-center justify-center gap-4 gap-y-4">
          <button
            className="btn flex-auto gap-2"
            onClick={() => setUseCam(!useCam)}
            type="button"
          >
            {useCam ? (
              <>
                <CameraSlash className="h-8 w-8" />
                Stop Scanning
              </>
            ) : (
              <>
                <Camera className="h-8 w-8" />
                Scan Barcode
              </>
            )}
          </button>
          <button className="btn flex-auto gap-2">Log Tote</button>
        </div>

        {useCam && (
          <div
            ref={scannerRef}
            className="scanner mx-auto h-auto w-full max-w-lg"
          >
            <Scanner
              scannerRef={scannerRef}
              onDetected={(result) => {
                if (result) {
                  setValue("toteId", result);
                  setQrData(result);
                  handleSubmit(onSubmit)();
                }
              }}
            />
          </div>
        )}
      </form>
    </>
  );
};
export default IncomingForm;
