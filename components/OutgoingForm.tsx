import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
  // Get names for autocomplete
  const [names, setNames] = useState([]);
  useEffect(() => {
    fetch("/.netlify/functions/get-names")
      .then((response) => response.json())
      .then((data) => {
        setNames(
          data.names.sort((a, b) =>
            a.localeCompare(b, "en", { sensitivity: "base" })
          )
        );
      });
  }, []);

  // Reset count for triggering clear of typeahead field
  const [resetCount, setResetCount] = useState(0);

  // useForm
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  // State machine
  const [state, send] = useMachine(outgoingFormMachine, {
    actions: {
      resetForm: () => {
        setResetCount(resetCount + 1);
        reset({
          orderId: "",
          toteId: "",
        });
      },
    },
  });

  // Submit handler
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // Get customer name from typeahead
    let customerName = "";
    if (Array.isArray(data.customerName) && data.customerName.length) {
      customerName = data.customerName[0];
    } else {
      customerName = data.customerName ?? "";
    }

    // Add new name
    if (!names.includes(customerName)) {
      const newNames = [...names];
      newNames.push(customerName);
      setNames(
        newNames.sort((a, b) =>
          a.localeCompare(b, "en", { sensitivity: "base" })
        )
      );
    }

    send({
      type: "SUBMIT",
      customerName: customerName,
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
        <Controller
          control={control}
          name="customerName"
          defaultValue=""
          render={({ field: { onChange } }) => (
            <CustomerName {...{ onChange, names, resetCount }} />
          )}
        />
        <OrderId {...{ register, errors }} />
        <ToteId {...{ register, errors }} />
        <button className="btn my-4">Log Outgoing Tote</button>
      </form>
    </div>
  );
};
export default OutgoingForm;
