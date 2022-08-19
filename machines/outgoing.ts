import { createMachine } from "xstate";
import { NEUTRAL, WARNING, SUCCESS, ERROR } from "../components/Alert";

interface Context {
  msg: string;
  alertStatus: string;
  customerName: string;
  orderId: string;
  toteId: string;
  isDuplicate: boolean;
}

type Event = {
  type: "SUBMIT";
  customerName: string;
  orderId: string;
  toteId: string;
};

const isDuplicate = (context) => context.isDuplicate;

export const outgoingFormMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHkCuAXKB7AlgOygAIAxLAJwFsA6HCAGzAGIBlAVQCEBZASQBVFQAByywc6HFjwCQAD0QBGAAwAWAMxVFANgBMygKzbt8gOzztBgDQgAnolWrFGxc+VLNq5YuMAOAL6+rNExcAhJyagAzMHQAYwALfCgAJTAY8ghYRghJMBo8ADcsAGtcoOxEsMoqKNiEghS0sgyEfEKYgENxSQBtRQBdaWFRLqkkWQUVdS1dAyNTc20rWwRPR01140V5eVU9FW17f0CMctDSKpr4xIb0zLAyMnIqQTpOiPCqMpCic8joq-qqVuLQKWA6I16AzGQzEElGoDkCHkym8mioxk0eixPkUens5iWiGUaio9ns3i08m8yk0AE5NEcQF8Kr8qKhBBBOtcgU0sjk8oUSp8Tt9KtR2ZzxIDGhAQW0uT1+oMRLDJNJEdpvOpaTqdd59c59d5jISEKptLSqPINl5jA4vMS9IzmWcPhKudL0ox7o8yM9Xuh3lUXT83RyPckebLWmCFXhIcrhnD1YhNdrdbSjYb9SabIhNMptFaNrSvNpjLTzapnSKWR8yFHWOH0JBGDJYOhOrl2hEW2QABTaZyKACUjBDYqoDZlTclkETqvh4wQmm88ioeNLyNM8z0ylN5st1s0m2MducxkdNeCdaqMQbEZuvOyeFyMaFE9Z97Aj6jctjEJKtCKojCmCBplQGaZgaihGrmyzaJojjHie7jGOY7jyNepyhneD5SpGMreg8TwvG8Hyfh836-jK-7gnCCbAUmapjBqWqQRmWawTmpq0uuw6KKoOx6MYejbMotLYaKrLTukADC+Gtu2nYtlQPZ9oOw5jpRVSyU0Ck-i2EALqBrH5muG6qFuyg7mYe6mohyHrKhqjoXomFSbe1DtIIOAAKIkWQbYdl2am9vcmnONptaulUPn+YFJnJmZSIGHo6J2qoq5rkYJjwamSgbsOWVGCoej0v4AQgHgWAQHA0g6dQtAMElLEIogWponiZi4kOuxYg5FLFusxp0poSj6k6VWNdU-x1IRtytUuiJ2WiXiKAc3h6FtqLbaarjrlq9gjdM5r6J5sXis23IyktYGFvtDjDaJDi6OYZ7VtNMW4dQekQLOXbGUxi73capJmGoNKmFtSj5WaBzDWNpaFieKgXT9VDUQRT5A0IIHJe1KzGFQng6A49LyGJ3GaA52wcXq9KmJWXifccN6XVOUYGYDd0pSixNCboHgnlSVNw+YyiI5ie4nliWLo5O8UBb6vOEyYzjotL5UWltNmqKaOiOPSJ6bUJpY+Arvyq8uVKmlSTgCY7zjIpVvhAA */
  createMachine(
    {
      tsTypes: {} as import("./outgoing.typegen").Typegen0,
      schema: { events: {} as Event, context: {} as Context },
      id: "Outgoing Form",
      initial: "idle",
      context: {
        msg: "Enter info for next tote:",
        alertStatus: "neutral",
        customerName: "",
        orderId: "",
        toteId: "",
        isDuplicate: false,
      },
      states: {
        idle: {
          entry: "idle",
          on: {
            SUBMIT: {
              target: "creatingRecord",
              actions: "submit",
            },
          },
        },
        creatingRecord: {
          entry: "creatingRecord",
          invoke: {
            src: "createRecord",
            onDone: "recordCreated",
            onError: [
              { target: "updatingRecord", cond: isDuplicate },
              { target: "apiError" },
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
        updatingRecord: {
          entry: "updatingRecord",
          invoke: {
            src: "updateRecord",
            onDone: "recordUpdated",
            onError: "apiError",
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
        apiError: {
          entry: "apiError",
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
          context.isDuplicate = false;
        },
        idle: (context) => {
          console.log("idle");
          context.msg = "Enter info for next tote:";
          context.alertStatus = NEUTRAL;
        },
        updatingRecord: (context) => {
          context.msg = "That tote has already been logged out.";
          context.alertStatus = WARNING;
        },
        recordUpdated: (context) => {
          context.msg = "Tote info has been updated.";
          context.alertStatus = SUCCESS;
        },
        creatingRecord: (context) => {
          context.msg = "Logging out tote...";
          context.alertStatus = NEUTRAL;
        },
        recordCreated: (context) => {
          context.msg = "Tote logged out successfully.";
          context.alertStatus = SUCCESS;
        },
        apiError: (context, event) => {
          context.msg = "Doh! Something went wrong.";
          context.alertStatus = ERROR;
        },
      },
      services: {
        createRecord: (context) => {
          return fetch("/.netlify/functions/create-record", {
            method: "POST",
            body: JSON.stringify({
              customerName: context.customerName,
              orderId: context.orderId,
              toteId: context.toteId,
            }),
          }).then((response) => {
            context.isDuplicate = response.status === 409;
            if (!response.ok) {
              throw Error;
            }
          });
        },
        updateRecord: (context) => {
          return fetch("/.netlify/functions/update-record", {
            method: "POST",
            body: JSON.stringify({
              customerName: context.customerName,
              orderId: context.orderId,
              toteId: context.toteId,
            }),
          }).then((response) => {
            if (!response.ok) {
              throw Error;
            }
          });
        },
      },
    }
  );
