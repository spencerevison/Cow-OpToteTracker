import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "../../types";

type OrderIdProps = {
  register: Function;
  errors: FieldErrors;
};

const OrderId: React.FC<OrderIdProps> = ({ register, errors }) => {
  return (
    <>
      <label className="input-group mt-4 w-auto">
        <span className="w-40">Order ID</span>
        <input
          {...register("orderId", {
            required: "Order ID is required.",
            minLength: {
              value: 5,
              message: "Order ID must be exactly 5 digits.",
            },
            maxLength: {
              value: 5,
              message: "Order ID must be exactly 5 digits.",
            },
            pattern: {
              value: /\d+/,
              message: "Order ID must only contain numbers.",
            },
          })}
          type="text"
          maxLength={5}
          placeholder="xxxxx"
          className={`input input-bordered ${
            errors.orderId ? "input-error" : ""
          }`}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name="orderId"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type} className="input-error-msg mt-1 text-error">
              {message}
            </p>
          ))
        }
      />
    </>
  );
};
export default OrderId;
