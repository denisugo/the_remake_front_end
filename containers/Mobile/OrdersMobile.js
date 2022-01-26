import style from "../../styles/Orders/Mobile/Orders.module.css";

function OrdersMobile({ items }) {
  return (
    <div className={style.orders}>
      {Object.entries(items).map(([key, value]) => {
        return (
          <div className={style.order} data-testid="order" key={key}>
            <div className={style.order_details} data-testid="order-details">
              <h2 className={style.order_id}>Order id: {key}</h2>

              <p
                className={`${style.status} ${
                  value.shipped ? style.delivered : ""
                }`}
              >
                Shipment status: {value.shipped ? "Delivered" : "Processing"}
              </p>
            </div>
            <div className={style.products} data-testid="products">
              {value.products.map((product) => {
                return (
                  <div
                    className={style.product}
                    data-testid="product"
                    key={product.product_id}
                  >
                    <h3 className={style.name} data-testid="name">
                      {product.name}
                    </h3>
                    <p className={style.quantity} data-testid="quantity">
                      Qty: {product.quantity}
                    </p>
                    <p className={style.product_id} data-testid="product-id">
                      Id: {product.product_id}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrdersMobile;
