import Image from "next/image";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import style from "../../styles/ProductPage/Desktop/ProductPage.module.css";

function ProductDesktop({
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
}) {
  return (
    <>
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

export default ProductDesktop;
