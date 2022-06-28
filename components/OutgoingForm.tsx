import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { buildClient } from "@datocms/cma-client-browser";
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [dupeRecord, setDupeRecord] = useState(false);

  let alertTimeout: ReturnType<typeof setTimeout>;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // TODO: Set state to loading
      clearTimeout(alertTimeout);

      // Retrieve any existing records with same IDs
      const existingRecords = await client.items.list({
        filter: {
          type: "tote",
          fields: {
            tote_id: {
              eq: data.toteId,
            },
          },
        },
      });

      // If it's not a duplicate, create the record
      if (existingRecords.length === 0) {
        // Create the new record
        const item = await client.items.create({
          item_type: {
            type: "item_type",
            id: process.env.NEXT_PUBLIC_DATOCMS_TOTE_MODEL_ID || "",
          },
          customer_name: data.customerName,
          order_id: data.orderId,
          tote_id: data.toteId,
        });
        // TODO: Handle creation error or set state to success
      } else {
        // TODO: Handle duplicate error
      }

      // Update state
      setDupeRecord(existingRecords.length > 0);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1 className="text-2xl">Log Outgoing Totes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerName {...{ register, errors }} />
        <OrderId {...{ register, errors }} />
        <ToteId {...{ register, errors }} />
        <button className="btn my-4">Log Outgoing Tote</button>
        <Alert {...{ alertVisible, dupeRecord }} />
        <progress className="progress w-56"></progress>
      </form>
    </>
  );
};
export default OutgoingForm;
