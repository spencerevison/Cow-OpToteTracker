import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { buildClient } from "@datocms/cma-client-browser";
import ToteId from "./ToteId";
import Alert from "./Alert";

interface FormInputs {
  customerName: string;
  orderId: string;
  toteId: string;
}

const client = buildClient({
  apiToken: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN || "",
});

const IncomingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const [alertVisible, setAlertVisible] = useState(false);

  let alertTimeout: ReturnType<typeof setTimeout>;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
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

      if (existingRecords.length) {
        let failure = false;
        existingRecords.forEach(async (record) => {
          const deletedRecord = await client.items.destroy(record.id);
          if (deletedRecord.tote_id !== record.tote_id) {
            failure = true;
          }
        });
        // TODO: Handle deletion error
      } else {
        // TODO: Handle record not found error
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1 className="text-2xl">Log Incoming Totes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToteId {...{ register, errors }} />
        <button className="btn my-4">Log Incoming Tote</button>
      </form>
    </>
  );
};
export default IncomingForm;
