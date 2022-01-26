import CheckoutFormMobile from "../../components/CheckoutForm/Mobile/CheckoutFormMobile";
import useCheckoutForm from "../../hooks/useCheckoutForm";

function CheckoutMobile() {
  const props = useCheckoutForm();
  return (
    <>
      <CheckoutFormMobile {...props} />
    </>
  );
}

export default CheckoutMobile;
