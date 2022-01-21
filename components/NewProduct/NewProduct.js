import { useState } from "react";
import { endpoints } from "../../config/constants";
import Button from "../Button/Button";
import style from "../../styles/NewProduct/NewProduct.module.css";
import Input from "../Input/Input";

function NewProduct({ callback }) {
  //* State setup
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  //? category could only have one of the following values: 'Health', 'Energy', 'Other'
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState("");

  //* Handle button click
  const handleClick = () => {
    //* Toggle visible
    setVisible(!visible);
  };
  //* Handle form submission
  const handleSubmit = async () => {
    //* Generate body
    const body = {
      name,
      description,
      price: parseInt(price),
      category,
      preview,
    };
    //* Generate URL
    const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.products()}`;
    //? body should be converted to application/json
    const fetchedProduct = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    //? If some error occured, it should display an alert
    if (!fetchedProduct.ok) {
      return alert("Something went wrong");
    }

    //* Extract a product from the response
    const product = await fetchedProduct.json();

    //* Update productList
    callback(product);
    //* Reset all input fields
    setName("");
    setDescription("");
    setPrice("");
    setPreview("");
    setCategory("");
    //* Set visible to false
    setVisible(false);
  };

  return (
    <>
      {!visible && (
        <div>
          <Button
            text={"Add new product"}
            label="New product"
            width={200}
            height={50}
            fontSize={17}
            data-testid="add-button"
            callback={handleClick}
          />
        </div>
      )}
      {visible && (
        <div className={style.form_container}>
          <form onSubmit={() => handleSubmit()} className={style.form}>
            <Input
              placeholder="name"
              value={name}
              callback={setName}
              type="text"
              height={50}
              width={250}
              fontSize={17}
              label="Name"
              required={true}
              pattern="^[A-Z]{1}[a-z\s]{1,99}$"
              data-testid="name-input"
            />
            <Input
              placeholder="description"
              value={description}
              callback={setDescription}
              type="text"
              height={50}
              width={250}
              fontSize={17}
              label="Description"
              required={true}
              pattern="^[A-Z]{1}[a-z\s]{1,199}$"
              data-testid="description-input"
            />
            <Input
              placeholder="price"
              value={price}
              callback={setPrice}
              type="text"
              height={50}
              width={250}
              fontSize={17}
              label="Price"
              required={true}
              pattern="^[0-9]*$"
              data-testid="price-input"
            />
            <Input
              placeholder="category"
              value={category}
              callback={setCategory}
              type="text"
              height={50}
              width={250}
              fontSize={17}
              label="Category"
              required={true}
              pattern="^[a-z]{1,60}$"
              data-testid="category-input"
            />

            <Input
              placeholder="preview"
              value={preview}
              callback={setPreview}
              type="text"
              height={50}
              width={250}
              fontSize={17}
              label="Preview"
              required={true}
              // pattern="https:"
              data-testid="preview-input"
            />

            <Button
              text="Submit"
              height={50}
              width={250}
              label="submit"
              fontSize={17}
              callback={() => {}}
              data-testid="submit-button"
            />
          </form>

          <Button
            text="Cancel"
            label="Cancel"
            width={200}
            height={50}
            fontSize={17}
            callback={handleClick}
            data-testid="cancel-button"
          />
        </div>
      )}
    </>
  );
}

export default NewProduct;
