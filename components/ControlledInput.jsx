import { useEffect, useState } from "react";

export default function ControlledInput(props) {
  const [value, setValue] = useState("");
  const { changeAction, wipe, ...rest } = props;

  const ChangeValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    props.changeAction({ value: e.target.value });
  };

  useEffect(() => {
    wipe ? setValue("") : null;
    return ()=>{}
  }, [wipe]);

  return <input value={value} onChange={ChangeValue} {...rest}></input>;
}
