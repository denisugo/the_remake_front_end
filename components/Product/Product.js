import Image from "next/image";
import Link from "next/link";
import { routes } from "../../config/constants";

import style from "../../styles/Product/Product.module.css";

function Product({ id, name, description, price, preview }) {
  // const query = encodeURIComponent(
  //   `id=${id}&description=${description}&price=${price}&preview=${preview}`
  // );
  return (
    <Link
      href={{
        pathname: `${routes.product}`,
        query: {
          id,
          name,
          description,
          price,
          preview,
        },
      }}
    >
      {/* <Link href={`${routes.product}?${query}`}> */}
      <a className={style.product} data-testid="product">
        <div className={style.preview}>
          <Image
            className={style.image}
            src={preview}
            layout="responsive"
            width={1}
            height={1}
            alt="Product preview"
          />
        </div>
        <h3 className={style.name}>{name}</h3>
        <p className={style.description}>{description}</p>
        <p className={style.price}>{price}</p>
      </a>
    </Link>
  );
}

export default Product;
