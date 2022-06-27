import React from "react";

type AlertProps = {
  alertVisible: Boolean;
  dupeRecord: Boolean;
};

const Alert: React.FC<AlertProps> = ({ alertVisible, dupeRecord }) => {
  return (
    <div
      className={`alert shadow-lg ease-in ${
        alertVisible ? "opacity-100" : "opacity-0 duration-300 ease-out"
      } ${dupeRecord ? "alert-error" : "alert-success"}`}
    >
      {dupeRecord ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Duplicate record</span>
        </div>
      ) : (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Boom Kaukalaukus! Tote added!</span>
        </div>
      )}
    </div>
  );
};
export default Alert;
