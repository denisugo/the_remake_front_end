import jwt from "jsonwebtoken";

import Meta from "../components/Head/Meta";
import { endpoints, jwtConfig, routes } from "../config/constants";

import useCart from "../hooks/useCart";
import CartDesktop from "../containers/Desktop/CartDesktop";
import CartMobile from "../containers/Mobile/CartMobile";

function Cart({ user, cartItems, isMobile }) {
  const props = useCart(user, cartItems);

  return (
    <>
      <Meta title="Cart" description="test" />
      {!isMobile && <CartDesktop {...props} />}
      {isMobile && <CartMobile {...props} />}
    </>
  );
}

export default Cart;

export const getServerSideProps = async (context) => {
  //* Check if user cookie is set
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

  //* Fetch cart items
  let cartItems = [];
  //* Generate url
  const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.cart()}`;
  const fetchedItems = await fetch(url, {
    credentials: "include",
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: `connect.sid=${context.req.cookies["connect.sid"]}`,
    },
  });
  //? If fetched successfully, retrieve cart items array
  if (fetchedItems.ok) cartItems = await fetchedItems.json();

  //? Check a device type
  let isMobile = false;
  const agent = context.req.headers["user-agent"].toLowerCase();
  if (/android/.exec(agent) || /iphone/.exec(agent)) isMobile = true;

  return {
    props: {
      user,
      cartItems,
      isMobile,
    },
  };
};
