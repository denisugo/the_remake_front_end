import { useState } from "react";

import Meta from "../components/Head/Meta";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";
import Search from "../components/Search/Search";
import { endpoints, routes } from "../config/constants";
import { initUser } from "../features/UserSlice/UserSlice";
import { wrapper } from "../app/store";

function Home({ list }) {
  // export default function Home({ list, user, isMobile }) {
  //TODO: select user, render 'add new' button if admin

  const [productList, setProductList] = useState(list);

  return (
    <>
      <Meta title="Main page" description="test" />
      <Header />
      <Search list={list} callback={setProductList} />
      <ProductList list={productList} />
    </>
  );
}

export default Home;

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
        list: null,
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
  return {
    props: {
      list: jsonResponse,
    },
  };
  //   }
  // );
};
