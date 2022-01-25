import { CardElement } from "@stripe/react-stripe-js";
import Button from "../../Button/Button";
import style from "../../../styles/CheckoutForm/Desktop/CheckoutForm.module.css";

function CheckoutFormDesktop({
  handleChange,
  handleSubmit,
  invalid,
  required,
  options,
  amount,
  stripe,
  isLoading,
  message,
  clientSecret,
}) {
  //* Retutn nothing when no clientSecret recieved
  if (clientSecret === "")
    return (
      <div>
        <div id={style.payment_message} data-testid="message">
          {message}
        </div>
      </div>
    );
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        className={`${style.payment_element} ${invalid ? style.invalid : ""}  ${
          required ? style.required : ""
        }`}
        options={options}
        onChange={handleChange}
        data-testid="card"
      />

      <Button
        width={400}
        height={50}
        text={`Pay $${amount}`}
        fontSize={17}
        label="Pay"
        disabled={invalid || !stripe || isLoading}
      />

      {/* Show any error or success messages */}
      <div id={style.payment_message} data-testid="message">
        {message}
      </div>
    </form>
  );
}

export default CheckoutFormDesktop;
