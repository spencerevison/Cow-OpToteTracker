import React from "react";
import NeutralIcon from "../assets/svg/neutral-icon.svg";
import WarningIcon from "../assets/svg/warning-icon.svg";
import ErrorIcon from "../assets/svg/error-icon.svg";
import SuccessIcon from "../assets/svg/success-icon.svg";

export const NEUTRAL = "neutral";
export const WARNING = "warning";
export const ERROR = "error";
export const SUCCESS = "success";

type AlertProps = {
  msg: string;
  status: string;
};

const Alert: React.FC<AlertProps> = ({ msg, status }) => {
  return (
    <div
      className={`alert mx-auto mb-6 max-w-[350px] ease-in
      ${status === NEUTRAL && "opacity-"}
      ${status === WARNING && "alert-warning"}
      ${status === SUCCESS && "alert-success"}
      ${status === ERROR && "alert-error"}
    `}
    >
      <div>
        {status === NEUTRAL && <NeutralIcon />}
        {status === WARNING && <WarningIcon />}
        {status === SUCCESS && <SuccessIcon />}
        {status === ERROR && <ErrorIcon />}
        <span>{msg}</span>
      </div>
    </div>
  );
};
export default Alert;
