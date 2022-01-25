import React from "react";

import jwt from "jsonwebtoken";
import Meta from "../components/Head/Meta";
import { endpoints, routes, jwtConfig } from "../config/constants";
import OrdersDesktop from "../containers/Desktop/OrdersDesktop";
import OrdersMobile from "../containers/Mobile/OrdersMobile";

function Orders({ items, isMobile }) {
  return (
    <>
      <Meta title="Orders" description="test" />
      {!isMobile && <OrdersDesktop items={items} />}
      {isMobile && <OrdersMobile items={items} />}
    </>
  );
}

export default Orders;

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

  //* Fetch order items
  let items = {};
  //* Generate url
  const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.orders()}`;

  const fetchedItems = await fetch(url, {
    credentials: "include",
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: `connect.sid=${context.req.cookies["connect.sid"]}`,
    },
  });
  //? If fetched successfully, retrieve cart items array
  if (fetchedItems.ok) items = await fetchedItems.json();

  //? Here it is necessary to decode a user object, recieved from cookie
  const user = jwt.verify(context.req.cookies.user, jwtConfig.key);

  //? Check a device type
  let isMobile = false;
  const agent = context.req.headers["user-agent"].toLowerCase();
  if (/android/.exec(agent) || /iphone/.exec(agent)) isMobile = true;

  return {
    props: {
      user,
      items,
      isMobile,
    },
  };
};
