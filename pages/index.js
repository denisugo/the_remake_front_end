import { useState } from "react";
import jwt from "jsonwebtoken";

import Meta from "../components/Head/Meta";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";
import Search from "../components/Search/Search";
import { endpoints, jwtConfig } from "../config/constants";
import NewProduct from "../components/NewProduct/NewProduct";

function Home({ list, user }) {
  //TODO: Add two new containers
  //* State setup
  const [productList, setProductList] = useState(list);

  return (
    <>
      <Meta title="Main page" description="test" />
      {process.env.NEXT_PUBLIC_NODE_ENV === "production" && (
        <div style={{ background: "#d3aa14", padding: 10, margin: 10 }}>
          <h2>IMPORTANT NOTE!!!</h2>
          <p>
            {
              "herokuapp.com is included in the Mozilla Foundation’s Public Suffix List. This list is used in recent versions of several browsers, such as Firefox, Chrome and Opera, to limit how broadly a cookie may be scoped. In other words, in browsers that support the functionality, applications in the herokuapp.com domain are prevented from setting cookies for _.herokuapp.com. Note that _.herokuapp.com cookies can currently be set in Internet Explorer, but this behavior should not be relied upon and may change in the future. Therefore this app doesn't have an ability to set all necessary cookies while it is hosted on Heroku with an its default domain."
            }
          </p>
        </div>
      )}
      <Header />
      <Search list={list} callback={setProductList} />
      <ProductList list={productList} />
      {user && user.is_admin && (
        <NewProduct
          callback={(newItem) => setProductList([...productList, newItem])}
        />
      )}
    </>
  );
}

export default Home;

export const getServerSideProps = async (context) => {
  //* Display all env vars
  if (process.env.NEXT_PUBIC_NODE_ENV === "production") {
    console.log("process.env.NEXT_PUBLIC_HOST", process.env.NEXT_PUBLIC_HOST);
    console.log("process.env.NEXT_PUBLIC_THIS", process.env.NEXT_PUBLIC_THIS);
    console.log(
      "process.env.NEXT_PUBLIC_STRIPE_PK",
      process.env.NEXT_PUBLIC_STRIPE_PK
    );
  }

  //? Setting up the product endpoint
  const endpoint = endpoints.products();
  const url = `${process.env.NEXT_PUBLIC_HOST}${endpoint}`;

  //? Fetching the product list
  const response = await fetch(url);

  //? If there was an error, then no products are displayed
  if (!response.ok)
    return {
      props: {
        list: [],
      },
    };

  //? Converting the response to js object
  const jsonResponse = await response.json();

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
};
