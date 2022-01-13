import { useSelector } from "react-redux";
import { getUser, selectUser } from "../features/UserSlice/UserSlice";
import router from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";
import { endpoints, jwtConfig, routes } from "../config/constants";
import style from "../styles/Cart/Cart.module.css";

function Cart({ user, cartItems }) {
  //* Items setup
  const [items, setItems] = useState(cartItems);

  let total = 0;

  //* Handle removing item from cart
  const handleRemove = async (product_id) => {
    //* Generate body
    const body = { product_id };

    //* Generate url
    const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.cart(user.id)}`;

    //* Make a request
    //? Body should be converted to 'application/json'
    const fetched = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    //* Set upd updated array to items
    if (fetched.ok)
      return setItems(items.filter((item) => item.product_id !== product_id));
  };

  return (
    <>
      <Meta title="Cart" description="test" />
      <div className={style.container}>
        <div className={style.items}>
          {items.map((item, index) => {
            total += item.quantity * item.price;

            return (
              <div key={index} className={style.item} data-testid="cart-item">
                <div className={style.preview} data-testid="preview">
                  <Image
                    src={item.preview}
                    alt="Preview"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <h3 className={style.name} data-testid="name">
                  {item.name}
                </h3>
                <p className={style.price} data-testid="price">
                  ${item.price}
                </p>
                <p className={style.quantity} data-testid="quantity">
                  {item.quantity} pcs
                </p>
                <Button
                  className={style.cancel_button}
                  text="X"
                  label="Cancel"
                  fontSize={17}
                  callback={() => handleRemove(item.product_id)}
                  data-testid="cancel-button"
                />
              </div>
            );
          })}
        </div>
        <hr />

        <h2 className={style.total} data-testid="total">
          TOTAL: ${total}
        </h2>

        <Button
          className={style.link_button}
          text="Checkout your cart"
          label="Checkout"
          fontSize={17}
          height={50}
          width={200}
          callback={() => router.push(routes.checkout)}
          data-testid="checkout-button"
        />

        <Button
          className={style.link_button}
          text="View my orders"
          label="Orders"
          fontSize={17}
          height={50}
          width={200}
          callback={() => router.push(routes.orders)}
          data-testid="view-orders-button"
        />
      </div>
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

  return {
    props: {
      user,
      cartItems,
    },
  };
};
