import { useSelector } from "react-redux";
import { getUser, selectUser } from "../features/UserSlice/UserSlice";
import router from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";
import { endpoints, routes } from "../config/constants";
import style from "../styles/Cart/Cart.module.css";

function Cart(props) {
  const user = useSelector(selectUser);
  const [items, setItems] = useState([]);

  // Useeffect is used because of ssr
  React.useEffect(() => {
    if (!user) router.push(routes.login);
    else
      (async () => {
        const url = `${process.env.HOST}${endpoints.cart(user.id)}`;
        const items = await fetch(url, { credentials: "include" });
        if (items.ok) return setItems(await items.json());
      })();
  }, [user]);

  if (!user) return <div>No user found</div>;

  let total = 0;

  const handleRemove = async (product_id) => {
    const body = { product_id };
    const url = `${process.env.HOST}${endpoints.cart(user.id)}`;
    const fetched = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (fetched.ok)
      return setItems(items.filter((item) => item.id !== product_id));
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
                  callback={() => handleRemove(item.id)}
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
        />

        <Button
          className={style.link_button}
          text="View my orders"
          label="Orders"
          fontSize={17}
          height={50}
          width={200}
          callback={() => router.push(routes.orders)}
        />
      </div>
    </>
  );
}

export default Cart;
