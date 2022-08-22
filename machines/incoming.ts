import { createMachine } from "xstate";
import { NEUTRAL, WARNING, SUCCESS, ERROR } from "../components/Alert";
interface Context {
  msg: string;
  alertStatus: string;
  records: any[];
  toteId: string;
  errorStatus: number;
}

type Event = {
  type: "SUBMIT";
  toteId: string;
};

const isRecordNotFound = (context) => context.errorStatus === 404;

export const incomingFormMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHkCuAXKB7AlgOygAIAxLAJwFsA6HCAGzAGIBlAVQCEBZASQBVFQAByywc6HFjwCQAD0QBGAAwAWAMxVFANgBMygKzbt8gOzztBgDQgAnolWrFGxc+VLNq5YuMAOAL6+rNExcAhJyagAzMHQAYwALfCgAJTAY8ghYRghJMBo8ADcsAGtcoOxEsMoqKNiEghS0sgyEfEKYgENxSQBtRQBdaWFRLqkkWQUVdS1dAyNTc20rWwRPR01140V5eVU9FW17f0CMctDSKpr4xIb0zLAyMnIqQTpOiPCqMpCic8joq-qqVuLQKWA6I16AzGQzEElGoDkCHkym8mioxk0eixPkUens5iWiGUaio9ns3i08m8yk0AE5NEcQF8Kr8qKhBBBOtcgU0sjk8oUSp8Tt9KtR2ZzxIDGhAQW0uT1+oMRLDJNJEdpvOpaTqdd59c59d5jISEKptLSqPINl5jA4vMS9IzmWcPhKudL0ox7o8yM9Xuh3lUXT83RyPckebLWmCFXhIcrhnD1YhNdrdbSjYb9SabIhNMptFaNrSvNpjLTzapnSKWR8yFHWOH0JBGDJYOhOrl2hEW2QABTaZyKACUjBDYqoDZlTclkETqvh4wQmm88ioeNLyNM8z0ylN5st1s0m2MducxkdNeCdaqMQbEZuvOyeFyMaFE9Z97Aj6jctjEJKtCKojCmCBplQGaZgaihGrmyzaJojjHie7jGOY7jyNepyhneD5SpGMreg8TwvG8Hyfh836-jK-7gnCCbAUmapjBqWqQRmWawTmpq0uuw6KKoOx6MYejbMotLYaKrLTukADC+Gtu2nYtlQPZ9oOw5jpRVSyU0Ck-i2EALqBrH5muG6qFuyg7mYe6mohyHrKhqjoXomFSbe1DtIIOAAKIkWQbYdl2am9vcmnONptaulUPn+YFJnJmZSIGHo6J2qoq5rkYJjwamSgbsOWVGCoej0v4AQgHgWAQHA0g6dQtAMElLEIogWponiZi4kOuxYg5FLFusxp0poSj6k6VWNdU-x1IRtytUuiJ2WiXiKAc3h6FtqLbaarjrlq9gjdM5r6J5sXis23IyktYGFvtDjDaJDi6OYZ7VtNMW4dQekQLOXbGUxi73capJmGoNKmFtSj5WaBzDWNpaFieKgXT9VDUQRT5A0IIHJe1KzGFQng6A49LyGJ3GaA52wcXq9KmJWXifccN6XVOUYGYDd0pSixNCboHgnlSVNw+YyiI5ie4nliWLo5O8UBb6vOEyYzjotL5UWltNmqKaOiOPSJ6bUJpY+Arvyq8uVKmlSTgCY7zjIpVvhAA */
  createMachine(
    {
      tsTypes: {} as import("./incoming.typegen").Typegen0,
      schema: { events: {} as Event, context: {} as Context },
      id: "Incoming Form",
      initial: "idle",
      context: {
        msg: "Enter ID for next tote:",
        alertStatus: "neutral",
        records: [],
        toteId: "",
        errorStatus: 0,
      },
      states: {
        idle: {
          entry: "idle",
          on: {
            SUBMIT: {
              target: "deletingRecord",
              actions: "submit",
            },
          },
        },
        recordNotFound: {
          entry: "recordNotFound",
          after: {
            "5000": {
              target: "idle",
            },
          },
        },
        deletingRecord: {
          entry: "deletingRecord",
          invoke: {
            src: "deleteRecord",
            onDone: "recordDeleted",
            onError: [
              { cond: isRecordNotFound, target: "recordNotFound" },
              { target: "apiError" },
            ],
          },
        },
        recordDeleted: {
          entry: ["resetForm", "recordDeleted"],
          after: {
            "5000": {
              target: "idle",
            },
          },
        },
        apiError: {
          entry: "apiError",
          after: {
            "5000": {
              target: "idle",
            },
          },
        },
      },
    },
    {
      actions: {
        submit: (context, event) => {
          context.toteId = event.toteId;
          context.errorStatus = 0;
        },
        idle: (context) => {
          context.msg = "Enter ID for next tote:";
          context.alertStatus = NEUTRAL;
        },
        recordNotFound: (context) => {
          context.msg = "That tote isn't currently logged out.";
          context.alertStatus = WARNING;
        },
        deletingRecord: (context) => {
          context.msg = "Logging in tote...";
          context.alertStatus = NEUTRAL;
        },
        recordDeleted: (context) => {
          context.msg = "Tote logged in successfully.";
          context.alertStatus = SUCCESS;
        },
        apiError: (context) => {
          context.msg = "Doh! <insert cryptic error message>";
          context.alertStatus = ERROR;
        },
      },
      services: {
        deleteRecord: (context) => {
          return fetch("/.netlify/functions/delete-record", {
            method: "POST",
            body: JSON.stringify({ toteId: context.toteId }),
          }).then((response) => {
            if (!response.ok) {
              context.errorStatus = response.status;
              throw Error;
            }
          });
        },
      },
    }
  );
