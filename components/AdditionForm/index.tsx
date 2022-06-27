import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { buildClient } from "@datocms/cma-client-browser";
import CustomerName from "./CustomerName";
import OrderId from "./OrderId";
import ToteId from "./ToteId";
import Alert from "./Alert";

interface FormInputs {
  customerName: String;
  orderId: String;
  toteId: String;
}

const client = buildClient({
  apiToken: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN || "",
});

const AdditionForm = () => {
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
      <h1 className="text-lg">Log Outgoing Totes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerName {...{ register, errors }} />
        <OrderId {...{ register, errors }} />
        <ToteId {...{ register, errors }} />
        <button className="btn my-4">Add Tote</button>
        <Alert {...{ alertVisible, dupeRecord }} />
      </form>
    </>
  );
};
export default AdditionForm;
