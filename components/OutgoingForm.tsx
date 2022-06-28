import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMachine } from "@xstate/react";
import CustomerName from "./CustomerName";
import OrderId from "./OrderId";
import ToteId from "./ToteId";
import Alert from "./Alert";
import { outgoingFormMachine } from "../machines/outgoing";

interface FormInputs {
  customerName: string;
  orderId: string;
  toteId: string;
}

const OutgoingForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const [state, send] = useMachine(outgoingFormMachine, {
    actions: {
      resetForm: () => {
        reset();
      },
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    send({
      type: "SUBMIT",
      customerName: data.customerName,
      orderId: data.orderId,
      toteId: data.toteId,
    });
  };

  const showProgress = ["updatingRecord", "creatingRecord"].some(state.matches);

  return (
    <div className="text-center">
      <h1 className="text-2xl">Log Outgoing Totes</h1>
      <progress
        className={`progress mx-auto my-4 block w-56 ${
          !showProgress && "opacity-0"
        }`}
      ></progress>
      <Alert msg={state.context.msg} status={state.context.alertStatus} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerName {...{ register, errors }} />
        <OrderId {...{ register, errors }} />
        <ToteId {...{ register, errors }} />
        <button className="btn my-4">Log Outgoing Tote</button>
      </form>
    </div>
  );
};
export default OutgoingForm;
