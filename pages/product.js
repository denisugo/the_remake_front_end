import Meta from "../components/Head/Meta";

import { jwtConfig, routes } from "../config/constants";

import jwt from "jsonwebtoken";
import ProductDesktop from "../containers/Desktop/ProductDesktop";
import useProduct from "../hooks/useProduct";
import ProductMobile from "../containers/Mobile/ProductMobile";

function Product({ isMobile, ...otherProps }) {
  const props = useProduct(otherProps);
  return (
    <>
      <Meta title={otherProps.name} description="test" />
      {!isMobile && <ProductDesktop {...props} />}
      {isMobile && <ProductMobile {...props} />}
    </>
  );
}

export default Product;

export const getServerSideProps = async (context) => {
  //? Should only proceed if all details were supplied
  const query = context.query;
  if (query) {
    if (
      query.id &&
      query.name &&
      query.description &&
      query.price &&
      query.preview
    ) {
      //? Check if user cookie is set
      //? If not, set user to null
      let user = null;
      if (context.req.cookies.user)
        //? Here it is necessary to decode a user object, recieved from cookie
        user = jwt.verify(context.req.cookies.user, jwtConfig.key);

      //? Check a device type
      let isMobile = false;
      const agent = context.req.headers["user-agent"].toLowerCase();
      if (/android/.exec(agent) || /iphone/.exec(agent)) isMobile = true;

      return {
        props: {
          isMobile,
          user,
          ...query,
        },
      };
    }
  }

  //* Redirect to main page
  //? If query string is not provide or incorrect it should redirect to main page
  return {
    redirect: {
      destination: routes.home,
      permanent: false,
    },
  };
};
