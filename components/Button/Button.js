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
  IconComponent = null,
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
      {IconComponent && <IconComponent />}
      <p>{text}</p>
    </button>
  );
}

export default Button;
