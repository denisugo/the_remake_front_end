import React from "react";

import jwt from "jsonwebtoken";

import { jwtConfig, routes } from "../config/constants";

import useUser from "../hooks/useUser";
import UserDesktop from "../containers/desktop/UserDesktop";
import UserMobile from "../containers/mobile/UserMobile";

function User({ user, isMobile }) {
  const props = useUser(user);

  return (
    <>
      {!isMobile && <UserDesktop {...props} />}
      {isMobile && <UserMobile {...props} />}
    </>
  );
}

export default User;

export const getServerSideProps = async (context) => {
  //? Check if user cookie is set
  //? If not, redirect to login page to attempt to sign in
  if (!context.req.cookies.user)
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      },
    };

  //? Here it is necessary to decode a user object, recieved from cookie
  const user = jwt.verify(context.req.cookies.user, jwtConfig.key);

  //? Check a device type
  let isMobile = false;
  const agent = context.req.headers["user-agent"].toLowerCase();
  if (/android/.exec(agent) || /iphone/.exec(agent)) isMobile = true;

  return {
    props: {
      user,
      isMobile,
    },
  };
};
