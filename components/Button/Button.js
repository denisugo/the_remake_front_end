import style from "../../styles/Button/Button.module.css";

function Button({
  width,
  height,
  text,
  callback,
  fontSize = undefined,
  label = "button",
  className = "",
  disabled = false,
  ...otherProps
}) {
  return (
    <button
      className={`${style.button} ${className}`}
      style={{ width, height, fontSize }}
      data-testid={
        otherProps["data-testid"] ? otherProps["data-testid"] : "button"
      }
      role="button"
      aria-label={label}
      onClick={callback}
      onSelect={callback}
      disabled={disabled}
    >
      <p>{text}</p>
    </button>
  );
}

export default Button;
