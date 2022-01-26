import CheckoutFormDesktop from "../../components/CheckoutForm/Desktop/CheckoutFormDesktop";
import useCheckoutForm from "../../hooks/useCheckoutForm";

function CheckoutDesktop() {
  const props = useCheckoutForm();
  return (
    <>
      <CheckoutFormDesktop {...props} />
    </>
  );
}

export default CheckoutDesktop;
