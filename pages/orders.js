import React from "react";

import jwt from "jsonwebtoken";
import Meta from "../components/Head/Meta";
import { endpoints, routes, jwtConfig } from "../config/constants";
import style from "../styles/Orders/Orders.module.css";

function Orders({ items }) {
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

  return {
    props: {
      user,
      items,
    },
  };
};
