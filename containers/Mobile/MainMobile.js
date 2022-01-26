import Search from "../../components/Search/Search";
import NewProduct from "../../components/NewProduct/NewProduct";
import { useEffect, useState } from "react";
import HeaderMobile from "../../components/Header/Mobile/HeaderMobile";
import ProductListMobile from "../../components/ProductList/Mobile/ProductListMobile";

function MainMobile({ user, list }) {
  //* State setup
  const [productList, setProductList] = useState(list);

  //? NewProduct should update the original list
  //? But Search should NOT mutate the original list
  const [originalList, setOriginalList] = useState(list);

  useEffect(() => {
    setProductList(originalList);
  }, [originalList]);

  return (
    <div>
      <HeaderMobile />
      {/* Search doesnt require a mobile version now */}
      <Search list={originalList} callback={setProductList} />
      <ProductListMobile list={productList} />
      {user && user.is_admin && (
        //  ! NewProduct doesnt require a mobile version now
        <NewProduct
          callback={(newItem) => setOriginalList([...originalList, newItem])}
        />
      )}
    </div>
  );
}

export default MainMobile;
