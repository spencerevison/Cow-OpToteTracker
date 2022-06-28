import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { buildClient } from "@datocms/cma-client-browser";
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

const client = buildClient({
  apiToken: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN || "",
});

const OutgoingForm = () => {
  const {
    register,
    watch,
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

  const showProgress = [
    "fetchingRecords",
    "updatingRecord",
    "creatingRecord",
  ].some(state.matches);

  const showAlert = ["recordUpdated", "recordCreated", "apiError"].some(
    state.matches
  );

  return (
    <>
      <h1 className="text-2xl">Log Outgoing Totes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerName {...{ register, errors }} />
        <OrderId {...{ register, errors }} />
        <ToteId {...{ register, errors }} />
        <button className="btn my-4">Log Outgoing Tote</button>
        {showAlert && (
          <Alert msg={state.context.msg} failure={state.matches("apiError")} />
        )}
        {showProgress && <progress className="progress block w-56"></progress>}
      </form>
    </>
  );
};
export default OutgoingForm;
