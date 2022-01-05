import { useSelector } from "react-redux";
import { getUser, selectUser } from "../features/UserSlice/UserSlice";
import router from "next/router";
import Image from "next/image";
import React, { useState } from "react";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";
import { endpoints, routes } from "../config/constants";
import style from "../styles/Orders/Orders.module.css";

function Orders(props) {
  const user = useSelector(selectUser);

  //* items here have the object type
  const [items, setItems] = useState({});

  //* Useeffect is used because of ssr
  React.useEffect(() => {
    if (!user) router.push(routes.login);
    else
      (async () => {
        const url = `${process.env.HOST}${endpoints.orders(user.id)}`;
        const items = await fetch(url, { credentials: "include" });
        if (items.ok) return setItems(await items.json());
      })();
  }, [user]);

  if (!user) return <div>No user found</div>;

  return (
    <>
      <Meta title="Orders" description="test" />
      <div className={style.orders}>
        {Object.entries(items).map(([key, value]) => {
          return (
            <div className={style.order} data-testid="order" key={key}>
              <div className={style.order_details} data-testid="order-details">
                <h2 className={style.order_id}>Order id: {key}</h2>

                <p
                  className={`${style.status} ${
                    value.shipped ? style.delivered : ""
                  }`}
                >
                  Shipment status: {value.shipped ? "Delivered" : "Processing"}
                </p>
              </div>
              <div className={style.products} data-testid="products">
                {value.products.map((product) => {
                  return (
                    <div
                      className={style.product}
                      data-testid="product"
                      key={product.product_id}
                    >
                      <h3 className={style.name} data-testid="name">
                        {product.name}
                      </h3>
                      <p className={style.quantity} data-testid="quantity">
                        Quantity: {product.quantity}
                      </p>
                      <p className={style.product_id} data-testid="product-id">
                        Product id: {product.product_id}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Orders;
