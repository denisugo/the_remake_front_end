import Button from "../Button/Button";

function NewProduct(props) {
  return (
    <div>
      <Button
        text={"Add new product"}
        label="New product"
        width={200}
        height={50}
        fontSize={17}
      />
    </div>
  );
}

export default NewProduct;
