import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import router from "next/router";
import React from "react";
import { useSelector } from "react-redux";

import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import Meta from "../components/Head/Meta";
import { endpoints, routes } from "../config/constants";
import { selectUser } from "../features/UserSlice/UserSlice";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

//TODO: check if user

function Checkout(props) {
  //* Check for user existence
  const user = useSelector(selectUser);

  //* Useeffect is used because of ssr
  React.useEffect(() => {
    if (!user) router.push(routes.login);
  }, [user]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    appearance,
  };
  return (
    <>
      <Meta title="Checkout" description="test" />
      {user && (
        <Elements
          options={options}
          stripe={stripePromise}
          data-testid="elements"
        >
          <CheckoutForm user={user} />
        </Elements>
      )}
    </>
  );
}

export default Checkout;
