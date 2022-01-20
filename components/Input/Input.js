import { useMemo } from "react";
import style from "../../styles/Input/Input.module.css";

function Input({
  placeholder,
  type,
  width,
  height,
  fontSize,
  callback,
  value = "",
  required = false,
  className = "",
  label = "input",
  pattern = undefined,
  ...otherProps
}) {
  let classNameString = `${style.input}`;
  //* Check if this input is required
  if (required && value === "")
    classNameString = classNameString.concat(" ", `${style.required}`);

  //* Check if value matchs pattern
  const regex = new RegExp(pattern);
  if (!regex.exec(value) && value !== "")
    classNameString = classNameString.concat(" ", `${style.invalid}`);

  //* Check if this has its unique className
  if (className !== "")
    classNameString = classNameString.concat(" ", `${className}`);

  //? With useMemo hook it will stop re-render unless classname or value are changed
  return useMemo(
    () => (
      <input
        className={classNameString}
        style={{ width, height, fontSize }}
        onChange={(event) => callback(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
        onInvalid={(event) => event.preventDefault()}
        required={required}
        autoComplete="off"
        name={label}
        aria-label={label}
        data-testid={
          otherProps["data-testid"] ? otherProps["data-testid"] : "input"
        }
        pattern={pattern}
      />
    ),
    [value, className]
  );
}

export default Input;
