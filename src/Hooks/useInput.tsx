import React, { useState } from "react";

export default (defaultValue: string): any => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: newValue },
    } = e;
    setValue(newValue);
  };

  return { value, onChange, setValue };
};
