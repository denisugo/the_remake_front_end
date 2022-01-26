import Product from "../../Product/Product";
import style from "../../../styles/ProductList/Mobile/ProductList.module.css";

function ProductListMobile({ list }) {
  return (
    <div className={style.container} data-testid="productlist">
      {list.map((product) => (
        <Product
          id={product.id}
          key={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          preview={product.preview}
        />
      ))}
    </div>
  );
}

export default ProductListMobile;
