// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    submit: "SUBMIT";
    fetchingRecords: "SUBMIT";
    updatingRecord: "done.invoke.Outgoing Form.fetchingRecords:invocation[0]";
    resetForm:
      | "done.invoke.Outgoing Form.updatingRecord:invocation[0]"
      | "done.invoke.Outgoing Form.creatingRecord:invocation[0]";
    recordUpdated: "done.invoke.Outgoing Form.updatingRecord:invocation[0]";
    creatingRecord: "done.invoke.Outgoing Form.fetchingRecords:invocation[0]";
    recordCreated: "done.invoke.Outgoing Form.creatingRecord:invocation[0]";
  };
  internalEvents: {
    "done.invoke.Outgoing Form.fetchingRecords:invocation[0]": {
      type: "done.invoke.Outgoing Form.fetchingRecords:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Outgoing Form.updatingRecord:invocation[0]": {
      type: "done.invoke.Outgoing Form.updatingRecord:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Outgoing Form.creatingRecord:invocation[0]": {
      type: "done.invoke.Outgoing Form.creatingRecord:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Outgoing Form.fetchingRecords:invocation[0]": {
      type: "error.platform.Outgoing Form.fetchingRecords:invocation[0]";
      data: unknown;
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
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "resetForm";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "fetchingRecords"
    | "updatingRecord"
    | "recordUpdated"
    | "creatingRecord"
    | "recordCreated"
    | "apiError";
  tags: never;
}
