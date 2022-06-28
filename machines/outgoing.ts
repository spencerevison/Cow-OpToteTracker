import { createMachine } from "xstate";
import { buildClient } from "@datocms/cma-client-browser";
import { isContext } from "vm";

interface Context {
  msg: string;
  records: any[];
  customerName: string;
  orderId: string;
  toteId: string;
}

type Event = {
  type: "SUBMIT";
  customerName: string;
  orderId: string;
  toteId: string;
};

const client = buildClient({
  apiToken: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN || "",
});

const fetchRecords = async (context) => {
  context.records = await client.items.list({
    filter: {
      type: "tote",
      fields: {
        tote_id: {
          eq: context.toteId,
        },
      },
    },
  });
};

const updateRecord = async (context) => {
  for (const record of context.records) {
    await client.items.update(record.id, {
      customer_name: context.customerName,
      order_id: context.orderId,
      tote_id: context.toteId,
    });
  }
};

const createRecord = async (context) => {
  await client.items.create({
    item_type: {
      type: "item_type",
      id: process.env.NEXT_PUBLIC_DATOCMS_TOTE_MODEL_ID || "",
    },
    customer_name: context.customerName,
    order_id: context.orderId,
    tote_id: context.toteId,
  });
};

const isNewRecord = ({ records }) => records.length === 0;
const isDuplicateRecord = ({ records }) => records.length > 0;

export const outgoingFormMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHkCuAXKB7AlgOygAIAxLAJwFsA6HCAGzAGIBlAVQCEBZASQBVFQAByywc6HFjwCQAD0QBGAAwAWAMxVFANgBMygKzbt8gOzztBgDQgAnolWrFGxc+VLNq5YuMAOAL6+rNExcAhJyagAzMHQAYwALfCgAJTAY8ghYRghJMBo8ADcsAGtcoOxEsMoqKNiEghS0sgyEfEKYgENxSQBtRQBdaWFRLqkkWQUVdS1dAyNTc20rWwRPR01140V5eVU9FW17f0CMctDSKpr4xIb0zLAyMnIqQTpOiPCqMpCic8joq-qqVuLQKWA6I16AzGQzEElGoDkCHkym8mioxk0eixPkUens5iWiGUaio9ns3i08m8yk0AE5NEcQF8Kr8qKhBBBOtcgU0sjk8oUSp8Tt9KtR2ZzxIDGhAQW0uT1+oMRLDJNJEdpvOpaTqdd59c59d5jISEKptLSqPINl5jA4vMS9IzmWcPhKudL0ox7o8yM9Xuh3lUXT83RyPckebLWmCFXhIcrhnD1YhNdrdbSjYb9SabIhNMptFaNrSvNpjLTzapnSKWR8yFHWOH0JBGDJYOhOrl2hEW2QABTaZyKACUjBDYqoDZlTclkETqvh4wQmm88ioeNLyNM8z0ylN5st1s0m2MducxkdNeCdaqMQbEZuvOyeFyMaFE9Z97Aj6jctjEJKtCKojCmCBplQGaZgaihGrmyzaJojjHie7jGOY7jyNepyhneD5SpGMreg8TwvG8Hyfh836-jK-7gnCCbAUmapjBqWqQRmWawTmpq0uuw6KKoOx6MYejbMotLYaKrLTukADC+Gtu2nYtlQPZ9oOw5jpRVSyU0Ck-i2EALqBrH5muG6qFuyg7mYe6mohyHrKhqjoXomFSbe1DtIIOAAKIkWQbYdl2am9vcmnONptaulUPn+YFJnJmZSIGHo6J2qoq5rkYJjwamSgbsOWVGCoej0v4AQgHgWAQHA0g6dQtAMElLEIogWponiZi4kOuxYg5FLFusxp0poSj6k6VWNdU-x1IRtytUuiJ2WiXiKAc3h6FtqLbaarjrlq9gjdM5r6J5sXis23IyktYGFvtDjDaJDi6OYZ7VtNMW4dQekQLOXbGUxi73capJmGoNKmFtSj5WaBzDWNpaFieKgXT9VDUQRT5A0IIHJe1KzGFQng6A49LyGJ3GaA52wcXq9KmJWXifccN6XVOUYGYDd0pSixNCboHgnlSVNw+YyiI5ie4nliWLo5O8UBb6vOEyYzjotL5UWltNmqKaOiOPSJ6bUJpY+Arvyq8uVKmlSTgCY7zjIpVvhAA */
  createMachine(
    {
      tsTypes: {} as import("./outgoing.typegen").Typegen0,
      schema: { events: {} as Event, context: {} as Context },
      id: "Outgoing Form",
      initial: "idle",
      states: {
        idle: {
          on: {
            SUBMIT: {
              target: "fetchingRecords",
              actions: "submit",
            },
          },
        },
        fetchingRecords: {
          entry: "fetchingRecords",
          invoke: {
            src: fetchRecords,
            onDone: [
              {
                cond: isDuplicateRecord,
                target: "updatingRecord",
              },
              {
                cond: isNewRecord,
                target: "creatingRecord",
              },
            ],
            onError: [
              {
                target: "apiError",
              },
            ],
          },
        },
        updatingRecord: {
          entry: "updatingRecord",
          invoke: {
            src: updateRecord,
            onDone: [
              {
                target: "recordUpdated",
              },
            ],
            onError: [
              {
                target: "apiError",
              },
            ],
          },
        },
        recordUpdated: {
          entry: ["resetForm", "recordUpdated"],
          after: {
            "2000": {
              target: "idle",
            },
          },
        },
        creatingRecord: {
          entry: "creatingRecord",
          invoke: {
            src: createRecord,
            onDone: [
              {
                target: "recordCreated",
              },
            ],
            onError: [
              {
                target: "apiError",
              },
            ],
          },
        },
        recordCreated: {
          entry: ["resetForm", "recordCreated"],
          after: {
            "2000": {
              target: "idle",
            },
          },
        },
        apiError: {
          after: {
            "2000": {
              target: "idle",
            },
          },
        },
      },
    },
    {
      actions: {
        submit: (context, event) => {
          context.customerName = event.customerName;
          context.orderId = event.orderId;
          context.toteId = event.toteId;
        },
        fetchingRecords: (context) => (context.msg = "Fetching records"),
        updatingRecord: (context) => (context.msg = "Updating record"),
        recordUpdated: (context) => (context.msg = "Record updated"),
        creatingRecord: (context) => (context.msg = "Creating record"),
        recordCreated: (context) => (context.msg = "Record created"),
      },
    }
  );
