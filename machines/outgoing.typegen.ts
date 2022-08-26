// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
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
    "error.platform.Outgoing Form.creatingRecord:invocation[0]": {
      type: "error.platform.Outgoing Form.creatingRecord:invocation[0]";
      data: unknown;
    };
    "error.platform.Outgoing Form.updatingRecord:invocation[0]": {
      type: "error.platform.Outgoing Form.updatingRecord:invocation[0]";
      data: unknown;
    };
    "xstate.after(2000)#Outgoing Form.apiError": {
      type: "xstate.after(2000)#Outgoing Form.apiError";
    };
    "xstate.after(2000)#Outgoing Form.recordCreated": {
      type: "xstate.after(2000)#Outgoing Form.recordCreated";
    };
    "xstate.after(2000)#Outgoing Form.recordUpdated": {
      type: "xstate.after(2000)#Outgoing Form.recordUpdated";
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
  eventsCausingActions: {
    apiError:
      | "error.platform.Outgoing Form.creatingRecord:invocation[0]"
      | "error.platform.Outgoing Form.updatingRecord:invocation[0]";
    creatingRecord: "SUBMIT";
    idle:
      | "xstate.after(2000)#Outgoing Form.apiError"
      | "xstate.after(2000)#Outgoing Form.recordCreated"
      | "xstate.after(2000)#Outgoing Form.recordUpdated"
      | "xstate.init";
    recordCreated: "done.invoke.Outgoing Form.creatingRecord:invocation[0]";
    recordUpdated: "done.invoke.Outgoing Form.updatingRecord:invocation[0]";
    resetForm:
      | "done.invoke.Outgoing Form.creatingRecord:invocation[0]"
      | "done.invoke.Outgoing Form.updatingRecord:invocation[0]";
    submit: "SUBMIT";
    updatingRecord: "error.platform.Outgoing Form.creatingRecord:invocation[0]";
  };
  eventsCausingServices: {
    createRecord: "SUBMIT";
    updateRecord: "error.platform.Outgoing Form.creatingRecord:invocation[0]";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "apiError"
    | "creatingRecord"
    | "idle"
    | "recordCreated"
    | "recordUpdated"
    | "updatingRecord";
  tags: never;
}
