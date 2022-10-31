import React, { useRef, useEffect } from "react";

export type CheckBoxState = "checked" | "unchecked" | "indeterminate";

type CheckboxProps = {
  value: CheckBoxState;
} & React.HTMLProps<HTMLInputElement>;

const Checkbox = (props: CheckboxProps) => {
  const { value, ...otherProps } = props;
  const checkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkRef.current) {
      checkRef.current.checked = value === "checked";
      checkRef.current.indeterminate = value === "indeterminate";
    }
  }, [value]);

  return <input type="checkbox" {...otherProps} ref={checkRef} />;
};

export default Checkbox;
