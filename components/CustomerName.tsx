import React, { useEffect, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
React.useLayoutEffect = React.useEffect;

type CustomerNameProps = {
  onChange: any;
  resetCount: any;
  names: string[];
};

const CustomerName: React.FC<CustomerNameProps> = (props) => {
  const { onChange, names, resetCount } = props;

  // When resetCount gets incremented by parent, clear field and set focus
  const typeaheadRef = useRef(null);
  useEffect(() => {
    if (resetCount !== 0) {
      typeaheadRef.current.clear();
      typeaheadRef.current.focus();
    }
  }, [resetCount]);

  return (
    <label className="input-group my-4 justify-center">
      <span className="w-40">Customer Name</span>
      <Typeahead
        ref={typeaheadRef}
        allowNew
        id="customerName"
        options={names}
        placeholder="Kalaukus, Kah"
        onChange={onChange}
        onInputChange={onChange}
        className="typeahead"
        newSelectionPrefix="New customer name: "
      />
    </label>
  );
};
export default CustomerName;
