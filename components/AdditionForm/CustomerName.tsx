import React from "react";

type CustomerNameProps = {
  register: any;
};

const CustomerName: React.FC<CustomerNameProps> = (props) => {
  const { register } = props;
  return (
    <label className="input-group my-4">
      <span className="w-40">Customer Name</span>
      <input
        {...register("customerName")}
        type="text"
        placeholder="Kah Kalaukus"
        className="input input-bordered"
      />
    </label>
  );
};
export default CustomerName;
