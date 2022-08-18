// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.Incoming Form.deletingRecord:invocation[0]": {
      type: "done.invoke.Incoming Form.deletingRecord:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Incoming Form.deletingRecord:invocation[0]": {
      type: "error.platform.Incoming Form.deletingRecord:invocation[0]";
      data: unknown;
    };
    "xstate.after(2000)#Incoming Form.apiError": {
      type: "xstate.after(2000)#Incoming Form.apiError";
    };
    "xstate.after(2000)#Incoming Form.recordDeleted": {
      type: "xstate.after(2000)#Incoming Form.recordDeleted";
    };
    "xstate.after(2000)#Incoming Form.recordNotFound": {
      type: "xstate.after(2000)#Incoming Form.recordNotFound";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    deleteRecord: "done.invoke.Incoming Form.deletingRecord:invocation[0]";
  };
  missingImplementations: {
    actions: "resetForm";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    apiError: "error.platform.Incoming Form.deletingRecord:invocation[0]";
    deletingRecord: "SUBMIT";
    idle:
      | "xstate.after(2000)#Incoming Form.apiError"
      | "xstate.after(2000)#Incoming Form.recordDeleted"
      | "xstate.after(2000)#Incoming Form.recordNotFound"
      | "xstate.init";
    recordDeleted: "done.invoke.Incoming Form.deletingRecord:invocation[0]";
    recordNotFound: "error.platform.Incoming Form.deletingRecord:invocation[0]";
    resetForm: "done.invoke.Incoming Form.deletingRecord:invocation[0]";
    submit: "SUBMIT";
  };
  eventsCausingServices: {
    deleteRecord: "SUBMIT";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "apiError"
    | "deletingRecord"
    | "idle"
    | "recordDeleted"
    | "recordNotFound";
  tags: never;
}
