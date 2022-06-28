import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "../types/hookForms";

type ToteIdProps = {
  register: Function;
  errors: FieldErrors;
};

const ToteId: React.FC<ToteIdProps> = ({ register, errors }) => {
  return (
    <>
      <label className="input-group mt-4">
        <span className="w-40">Tote ID</span>
        <input
          {...register("toteId", {
            required: "Tote ID is required.",
            minLength: {
              value: 4,
              message: "Tote ID must be exactly 4 digits.",
            },
            maxLength: {
              value: 4,
              message: "Tote ID must be exactly 4 digits.",
            },
            pattern: {
              value: /\d+/,
              message: "Tote ID must only contain numbers.",
            },
          })}
          type="text"
          maxLength={4}
          placeholder="xxxx"
          className={`input input-bordered ${
            errors.toteId ? "input-error" : ""
          }`}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name="toteId"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type} className="input-error-msg text-error">
              {message}
            </p>
          ))
        }
      />
    </>
  );
};
export default ToteId;
