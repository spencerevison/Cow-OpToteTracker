// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    resetForm:
      | "xstate.after(2000)#Outgoing Form.success"
      | "xstate.after(2000)#Outgoing Form.duplicateError"
      | "xstate.after(2000)#Outgoing Form.apiError";
  };
  internalEvents: {
    "xstate.after(2000)#Outgoing Form.success": {
      type: "xstate.after(2000)#Outgoing Form.success";
    };
    "xstate.after(2000)#Outgoing Form.duplicateError": {
      type: "xstate.after(2000)#Outgoing Form.duplicateError";
    };
    "xstate.after(2000)#Outgoing Form.apiError": {
      type: "xstate.after(2000)#Outgoing Form.apiError";
    };
    "done.invoke.createNewRecord": {
      type: "done.invoke.createNewRecord";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.checkForDuplicate": {
      type: "error.platform.checkForDuplicate";
      data: unknown;
    };
    "error.platform.createNewRecord": {
      type: "error.platform.createNewRecord";
      data: unknown;
    };
    "done.invoke.checkForDuplicate": {
      type: "done.invoke.checkForDuplicate";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    checkForDuplicate: "done.invoke.checkForDuplicate";
    createNewRecord: "done.invoke.createNewRecord";
  };
  missingImplementations: {
    actions: "resetForm";
    services: "checkForDuplicate" | "createNewRecord";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    checkForDuplicate: "SUBMIT";
    createNewRecord: "done.invoke.checkForDuplicate";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "checkForDuplicate"
    | "createNewRecord"
    | "success"
    | "duplicateError"
    | "apiError";
  tags: never;
}
