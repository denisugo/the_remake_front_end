import Image from "next/image";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";
import style from "../styles/ProductPage/ProductPage.module.css";
import { endpoints, jwtConfig, routes } from "../config/constants";
import { useState } from "react";
import jwt from "jsonwebtoken";

function Product({ id, name, description, price, preview, user }) {
  //* State setup
  const [quantity, setQuantity] = useState(1);

  //* Change value of quantity
  const handleChange = (val) => {
    val = parseInt(val);
    if (val >= 1) return setQuantity(val);
    setQuantity(1);
  };

  //* Open a new tab with login page
  //? When user is signed in, correct cookies are set, so reloading the product page will fetch these cookies
  //? That is why it should have '_blank' parameter
  const handleYouShouldLogin = async () => {
    global.window.open(routes.login, "_blank");
  };

  const handleAdd = async () => {
    //* Generate url
    const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.cart()}`;

    //* Generate body
    const body = {
      product_id: id,
      quantity,
    };

    //* Set up a request
    //? Body should be converted to type 'application/json'
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      alert("Item was added to cart");
    } else {
      alert("Error happened, please try again");
    }
  };

  const handleDelete = async () => {
    //* Generate url
    const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.product(id)}`;

    //* Set up a request
    //? Body should be converted to type 'application/json'
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok) {
      alert("Item was deleted");
    } else {
      alert("Error happened, please try again");
    }
  };

  return (
    <>
      <Meta title={name} description="test" />
      <div className={style.container}>
        <div className={style.preview} data-testid="preview">
          <Image
            src={preview}
            alt="Product preview"
            layout="responsive"
            width={1}
            height={1}
          />
        </div>

        <h2 className={style.name} data-testid="name">
          {name}
        </h2>
        <p className={style.description} data-testid="description">
          {description}
        </p>

        <p className={style.price} data-testid="price">
          ${price}
        </p>
        {user && (
          <>
            <Input
              className={style.quantity}
              width={40}
              fontSize={17}
              label="Quantity"
              value={quantity}
              callback={handleChange}
              data-testid="quantity-input"
            />
            <Button
              className={style.add}
              text="Add to cart"
              width={150}
              label="Add to cart"
              callback={handleAdd}
              data-testid="add-to-cart-button"
            />
          </>
        )}
        {!user && (
          <div
            className={style.you_should_login}
            data-testid="you-should-login"
          >
            <Button
              fontSize={15}
              text="You should login first to add the item to your cart"
              label="Login"
              callback={handleYouShouldLogin}
              data-testid="you-should-login-button"
            />
          </div>
        )}
      </div>
      {user && user.is_admin && (
        //? Should only be visible when an admin user opens this page
        <>
          <Button
            className={style.service_button}
            fontSize={17}
            width={150}
            height={50}
            text="Delete product"
            label="Delete"
            callback={handleDelete}
            data-testid="delete-button"
          />
        </>
      )}
    </>
  );
}

export default Product;

export const getServerSideProps = async (context) => {
  //? Should only proceed if all details were supplied
  const query = context.query;
  if (query) {
    if (
      query.id &&
      query.name &&
      query.description &&
      query.price &&
      query.preview
    ) {
      //? Check if user cookie is set
      //? If not, set user to null
      let user = null;
      if (context.req.cookies.user)
        //? Here it is necessary to decode a user object, recieved from cookie
        user = jwt.verify(context.req.cookies.user, jwtConfig.key);

      return {
        props: {
          user,
          ...query,
        },
      };
    }
  }

  //* Redirect to main page
  //? If query string is not provide or incorrect it should redirect to main page
  return {
    redirect: {
      destination: routes.home,
      permanent: false,
    },
  };
};
