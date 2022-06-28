import { createMachine } from "xstate";

type Event =
  | { type: "SUBMIT"; status: string }
  | { type: "RECORD_CREATED"; status: string }
  | { type: "DUPLICATE_FOUND"; status: string }
  | { type: "API_ERROR"; status: string };

export const outgoingFormMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHkCuAXKB7AlgOygAIAxLAJwFsA6HCAGzAGIBlAVQCEBZASQBVFQAByywc6HFjwCQAD0QBGAEwBmAGxVV8gOyKALAE4AHLu3z9ygDQgAnokVmqAVgAMrk7rVb581QF9fVmiYuAQk5NQAxgAWYBEA1qRkACKognQ4EQCG6EwQkmA0eABuWHEF0bEJ5ClpGdlg0sKi4pLScgiK+s5UzvKOqs6G+rpaw879VrYduoY9ruOKqsqOhoqKxv6BGNj4RImRMfGJNelZOYxgZGTkVGnZAGbhVBVH1amn9Y0iYhJSSLKILRLKgzXQedaqRTOLQzSaIZTmOauVSqVbyNTKQybEBBHahfbPQ5VZLvOrnJKsAAKABluABhACCvAAogB9YjIVgAOSSX2avzagOBoPBhkh0NhNnhukcSPGXj6ulUWmUWmxuJCeyeL2JJzJTAZlO4rOZACVTchTXyfq1-u0gcoQcZReKYYY4QgwfI5UDHIodANFurtpqwpRnmQwPUuWAAO6m2LkCCMPJ4Ar4EplCNRnIx+OJsgQa0tP6gdqdbq9fqDYajXTjVQe9H6OUmZxLeujYPBXZhyKR6NxhMRJMXK43O7oR7hiID3NDgtF-5NG2lgEdLo9PoDIYjMYTKUIHdOeb6eSDTTOAzdvFamdzsB54ej03MumWpKsumvpnM3nL74S0FDdK23Gs93rA8pjPOVlHRRwtEcbwlRvUMCVnHNHwXEdC0YQ1jTNC0rQA-lbTLOxNyrHda33RtD2rE9XEMdFDGcKENgCHEQ17AlYFQCIIjgWBGBkWB0HqKhMnuHIyAACihVwAEpGA1Hinj4gShOLAU7SFR0RWUCEoTdJtXFg1QVlVJZMVQtTwwgUkzjAZlxzIESxIkqSZPk+ZlNU-Engc2onJc64yG0sj128GDVmYrQHRWNZ3UPZQZTlBDvEcJUVTVTj-LvahMkEHBQvIdzxJySTpMuHylJU7iAvDIqStciK13aaLvVi7QEtWdYPTBdR61cUYUWUXp5F0fxOLwLAIDgaR8r7Gh6AaEjV2A+D1FWZw1GYtZFD9OipjMFt5l2+DEMy2zGoOSpjkcz51qA3SECQlsPEQ3RDv6SF-Q9ex1BcVxMVWZZDH6XKth7W7s0HfMcKXIRAJ08jPUUD1ERRZUlChfQvC6RwboKqgNME2B4Ge1H1yyrQqARdtEIRAZkUx3Q5UOxDRkcFYibyhqSaCj4clK8Kqcijq3CoIZjC8YwERMeQPWUBFW0hIYLKMPnodvZbmtFtrNt6RQnFGHRvpVwYDAG+sQXmVFDFVKEEWJvtDde+RkpOrFpqAA */
  createMachine({
    tsTypes: {} as import("./outgoing.typegen").Typegen0,
    schema: { events: {} as Event },
    id: "Outgoing Form",
    initial: "idle",
    states: {
      idle: {
        entry: "resetForm",
        on: {
          SUBMIT: {
            target: "checkForDuplicate",
          },
        },
      },
      checkForDuplicate: {
        invoke: {
          src: "checkForDuplicate",
          id: "checkForDuplicate",
          onDone: [
            {
              target: "createNewRecord",
            },
          ],
          onError: [
            {
              target: "apiError",
            },
          ],
        },
        on: {
          DUPLICATE_FOUND: {
            target: "duplicateError",
          },
          API_ERROR: {
            target: "apiError",
          },
        },
      },
      createNewRecord: {
        invoke: {
          src: "createNewRecord",
          id: "createNewRecord",
          onDone: [
            {
              target: "success",
            },
          ],
          onError: [
            {
              target: "apiError",
            },
          ],
        },
        on: {
          RECORD_CREATED: {
            target: "success",
          },
          API_ERROR: {
            target: "apiError",
          },
        },
      },
      success: {
        after: {
          "2000": {
            target: "idle",
          },
        },
      },
      duplicateError: {
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
  });
