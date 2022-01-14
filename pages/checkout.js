import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import jwt from "jsonwebtoken";

import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import Meta from "../components/Head/Meta";
import { jwtConfig, routes } from "../config/constants";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

function Checkout({ user }) {
  //TODO: Check this warning
  //! Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.
  //* Setup strip appearence
  const appearance = {
    theme: "stripe",
  };
  //* Setup stripe element options
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

export const getServerSideProps = async (context) => {
  //? Check if user cookie is set
  //? If not, redirect to login page to attempt to sign in
  if (!context.req.cookies.user)
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      },
    };

  //? Here it is necessary to decode a user object, recieved from cookie
  const user = jwt.verify(context.req.cookies.user, jwtConfig.key);

  return {
    props: {
      user,
    },
  };
};
