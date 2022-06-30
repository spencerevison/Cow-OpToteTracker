import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMachine } from "@xstate/react";
import ToteId from "./ToteId";
import Alert from "./Alert";
import { incomingFormMachine } from "../machines/incoming";

interface FormInputs {
  customerName: string;
  orderId: string;
  toteId: string;
}

const IncomingForm = () => {
  const {
    register,
    reset,
    handleSubmit,
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
    send({
      type: "SUBMIT",
      toteId: data.toteId,
    });
  };

  const showProgress = ["fetchRecord", "deletingRecord"].some(state.matches);

  return (
    <div className="text-center">
      <h1 className="text-2xl">Log Incoming Totes</h1>
      <progress
        className={`progress mx-auto my-4 block w-56 ${
          !showProgress && "opacity-0"
        }`}
      ></progress>
      <Alert msg={state.context.msg} status={state.context.alertStatus} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToteId {...{ register, errors }} />
        <button className="btn my-4">Log Incoming Tote</button>
      </form>
    </div>
  );
};
export default IncomingForm;
