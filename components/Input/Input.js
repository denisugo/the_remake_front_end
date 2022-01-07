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
  return (
    <input
      className={`${style.input} ${className}`}
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
  );
}

export default Input;
