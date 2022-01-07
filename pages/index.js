import { useState } from "react";
import jwt from "jsonwebtoken";

import Meta from "../components/Head/Meta";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";
import Search from "../components/Search/Search";
import { endpoints, routes, jwtConfig } from "../config/constants";
import Button from "../components/Button/Button";
import NewProduct from "../components/NewProduct/NewProduct";

function Home({ list, user }) {
  // export default function Home({ list, user, isMobile }) {
  //TODO: select user, render 'add new' button if admin

  const [productList, setProductList] = useState(list);

  return (
    <>
      <Meta title="Main page" description="test" />
      <Header />
      <Search list={list} callback={setProductList} />
      <ProductList list={productList} />
      <NewProduct callback={setProductList} />
    </>
  );
}

export default Home;

//TODO: Add decryption of JWT and retrieve a user
export const getServerSideProps = async (context) => {
  // export const getServerSideProps = wrapper.getServerSideProps(
  //   (store) => async (context) => {
  // const connectSidCookie = context.req.cookies["connect.sid"];
  // const cookie = `connect.sid=${connectSidCookie}`;
  //? Setting up the product endpoint
  const endpoint = endpoints.products();
  const url = `${process.env.HOST}${endpoint}`;

  //? Fetching the product list
  const response = await fetch(url, {
    // headers: {
    //   Cookie: connectSidCookie ? cookie : "",
    // },
  });
  //? If there was an error, then no products are displayed
  if (!response.ok)
    return {
      props: {
        list: [],
      },
    };

  //? Converting the response to js object
  const jsonResponse = await response.json();
  // const list = jsonResponse.products;
  // if (jsonResponse.user) store.dispatch(initUser(jsonResponse.user));
  // else if (connectSidCookie)
  //   context.res.setHeader(
  //     "Set-cookie",
  //     "connect.sid=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  //   );

  //? If here is a user
  //? Here it is necessary to decode a user object, recieved from cookie
  if (context.req.cookies.user) {
    const user = jwt.verify(context.req.cookies.user, jwtConfig.key);
    return {
      props: {
        list: jsonResponse,
        user,
      },
    };
  }

  //? If a user is not in cookies, return a product list only
  return {
    props: {
      list: jsonResponse,
    },
  };
  //   }
  // );
};
