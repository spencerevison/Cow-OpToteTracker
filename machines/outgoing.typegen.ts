// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    submit: "SUBMIT";
    idle:
      | "xstate.after(2000)#Outgoing Form.recordCreated"
      | "xstate.after(2000)#Outgoing Form.recordUpdated"
      | "xstate.after(2000)#Outgoing Form.apiError";
    creatingRecord: "SUBMIT";
    resetForm:
      | "done.invoke.Outgoing Form.creatingRecord:invocation[0]"
      | "done.invoke.Outgoing Form.updatingRecord:invocation[0]";
    recordCreated: "done.invoke.Outgoing Form.creatingRecord:invocation[0]";
    updatingRecord: "error.platform.Outgoing Form.creatingRecord:invocation[0]";
    recordUpdated: "done.invoke.Outgoing Form.updatingRecord:invocation[0]";
    apiError: "error.platform.Outgoing Form.updatingRecord:invocation[0]";
  };
  internalEvents: {
    "xstate.after(2000)#Outgoing Form.recordCreated": {
      type: "xstate.after(2000)#Outgoing Form.recordCreated";
    };
    "xstate.after(2000)#Outgoing Form.recordUpdated": {
      type: "xstate.after(2000)#Outgoing Form.recordUpdated";
    };
    "xstate.after(2000)#Outgoing Form.apiError": {
      type: "xstate.after(2000)#Outgoing Form.apiError";
    };
    "done.invoke.Outgoing Form.creatingRecord:invocation[0]": {
      type: "done.invoke.Outgoing Form.creatingRecord:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Outgoing Form.updatingRecord:invocation[0]": {
      type: "done.invoke.Outgoing Form.updatingRecord:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Outgoing Form.updatingRecord:invocation[0]": {
      type: "error.platform.Outgoing Form.updatingRecord:invocation[0]";
      data: unknown;
    };
    "error.platform.Outgoing Form.creatingRecord:invocation[0]": {
      type: "error.platform.Outgoing Form.creatingRecord:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    createRecord: "done.invoke.Outgoing Form.creatingRecord:invocation[0]";
    updateRecord: "done.invoke.Outgoing Form.updatingRecord:invocation[0]";
  };
  missingImplementations: {
    actions: "resetForm";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    createRecord: "SUBMIT";
    updateRecord: "error.platform.Outgoing Form.creatingRecord:invocation[0]";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "creatingRecord"
    | "recordCreated"
    | "updatingRecord"
    | "recordUpdated"
    | "apiError";
  tags: never;
}
