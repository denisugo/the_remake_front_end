import router from "next/router";
import Image from "next/image";

import Button from "../../components/Button/Button";
import { routes } from "../../config/constants";

import style from "../../styles/Cart/Mobile/Cart.module.css";

function CartMobile({ items, handleRemove, total }) {
  return (
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
                callback={() => handleRemove(item.product_id)}
                data-testid="cancel-button"
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
        data-testid="checkout-button"
      />

      <Button
        className={style.link_button}
        text="View my orders"
        label="Orders"
        fontSize={17}
        height={50}
        width={200}
        callback={() => router.push(routes.orders)}
        data-testid="view-orders-button"
      />
    </div>
  );
}

export default CartMobile;
