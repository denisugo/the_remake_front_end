import { useSelector } from "react-redux";
import { getUser, selectUser } from "../features/UserSlice/UserSlice";
import router from "next/router";
import Image from "next/image";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";
import style from "../styles/ProductPage/ProductPage.module.css";
import { endpoints, routes } from "../config/constants";
import { wrapper } from "../app/store";
import { useState } from "react";

function Product({ id, name, description, price, preview, user }) {
  //const user = useSelector(selectUser);

  // State setup
  const [quantity, setQuantity] = useState(1);

  const handleChange = (val) => {
    val = parseInt(val);
    if (val >= 1) return setQuantity(val);
    setQuantity(1);
  };

  const handleYouShouldLogin = async () => {
    //await router.push(routes.login);
    // await router.push({ pathname: routes.login, query: { target: "_blank" } });
    global.window.open(routes.login, "_blank");
  };

  const handleAdd = async () => {
    const endpoint = endpoints.cart(user.id);
    const url = `${process.env.HOST}${endpoint}`;
    const body = {
      product_id: id,
      quantity,
    };

    await fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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

        {/* <div data-testid="add-to-cart"> */}
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
            />
            <Button
              className={style.add}
              text="Add to cart"
              width={150}
              label="Add to cart"
              callback={handleAdd}
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
            />
          </div>
        )}
        {/* </div> */}
      </div>
    </>
  );
}

export default Product;

// export const getServerSideProps = async (context) => {
//   const query = context.query;
//   //console.log(query);

//   if (query.id) return { props: {  ...query } };
//   return {
//     redirect: {
//       destination: routes.login,
//       permanent: false,
//     },
//   };
// };

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const query = context.query;
    if (query.id) {
      await store.dispatch(
        getUser(`connect.sid=${context.req.cookies["connect.sid"]}`)
      );
      const user = selectUser(store.getState());
      // It is possible that the cookie token is not valid beause of its age, then it should be deleted
      if (!user)
        context.res.setHeader(
          "Set-cookie",
          "connect.sid=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        );

      return {
        props: {
          user,
          ...query,
        },
      };
    }

    return {
      redirect: {
        destination: routes.home,
        permanent: false,
      },
    };
  }
);
