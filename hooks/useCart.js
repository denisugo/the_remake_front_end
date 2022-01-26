import { useState } from "react";
import { endpoints } from "../config/constants";

function useCart(user, cartItems) {
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

  return { items, handleRemove, total };
}

export default useCart;
