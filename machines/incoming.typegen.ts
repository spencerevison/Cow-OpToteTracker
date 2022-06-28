// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    submit: "SUBMIT";
    idle:
      | "xstate.after(2000)#Incoming Form.recordNotFound"
      | "xstate.after(2000)#Incoming Form.recordDeleted"
      | "xstate.after(2000)#Incoming Form.apiError";
    fetchRecord: "SUBMIT";
    recordNotFound: "done.invoke.Incoming Form.fetchRecord:invocation[0]";
    deletingRecord: "done.invoke.Incoming Form.fetchRecord:invocation[0]";
    resetForm: "done.invoke.Incoming Form.deletingRecord:invocation[0]";
    recordDeleted: "done.invoke.Incoming Form.deletingRecord:invocation[0]";
    apiError:
      | "error.platform.Incoming Form.fetchRecord:invocation[0]"
      | "error.platform.Incoming Form.deletingRecord:invocation[0]";
  };
  internalEvents: {
    "xstate.after(2000)#Incoming Form.recordNotFound": {
      type: "xstate.after(2000)#Incoming Form.recordNotFound";
    };
    "xstate.after(2000)#Incoming Form.recordDeleted": {
      type: "xstate.after(2000)#Incoming Form.recordDeleted";
    };
    "xstate.after(2000)#Incoming Form.apiError": {
      type: "xstate.after(2000)#Incoming Form.apiError";
    };
    "done.invoke.Incoming Form.fetchRecord:invocation[0]": {
      type: "done.invoke.Incoming Form.fetchRecord:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Incoming Form.deletingRecord:invocation[0]": {
      type: "done.invoke.Incoming Form.deletingRecord:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Incoming Form.fetchRecord:invocation[0]": {
      type: "error.platform.Incoming Form.fetchRecord:invocation[0]";
      data: unknown;
    };
    "error.platform.Incoming Form.deletingRecord:invocation[0]": {
      type: "error.platform.Incoming Form.deletingRecord:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchRecord: "done.invoke.Incoming Form.fetchRecord:invocation[0]";
    deleteRecord: "done.invoke.Incoming Form.deletingRecord:invocation[0]";
  };
  missingImplementations: {
    actions: "resetForm";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchRecord: "SUBMIT";
    deleteRecord: "done.invoke.Incoming Form.fetchRecord:invocation[0]";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "fetchRecord"
    | "recordNotFound"
    | "deletingRecord"
    | "recordDeleted"
    | "apiError";
  tags: never;
}
