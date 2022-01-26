import { endpoints, routes } from "../config/constants";
import { useState } from "react";

function useProduct({ id, name, description, price, preview, user }) {
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
  return {
    preview,
    name,
    description,
    price,
    quantity,
    user,
    handleAdd,
    handleChange,
    handleDelete,
    handleYouShouldLogin,
  };
}

export default useProduct;
