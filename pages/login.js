import { useState } from "react";

import router from "next/router";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Meta from "../components/Head/Meta";
import style from "../styles/Login/Login.module.css";

import { endpoints, jwtConfig, routes } from "../config/constants";
import { FacebookIcon } from "../components/Icons";

function Login(props) {
  //* Inputs setup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    //* Retrieving a user
    const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.login()}`;

    //? Body should be ecoded as x-www-form-urlencoded
    const body = `${"username"}=${encodeURIComponent(
      username
    )}&${"password"}=${encodeURIComponent(password)}`;

    const fetchedUser = await fetch(url, {
      method: "POST",
      credentials: "include",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    //? If response is not ok, that means that an error occured
    //? So, user has to get a feedback
    if (!fetchedUser.ok) {
      setPassword("");
      setUsername("");
      return;
    }

    const user = await fetchedUser.json();

    //* Set token to cookies
    const token = jwt.sign(user, jwtConfig.key);
    const cookies = new Cookies();
    cookies.set("user", token, { path: "/", maxAge: jwtConfig.maxAge });
    //console.log(cookies.get("user"));

    //* Redirecting to user page
    router.push(routes.user);
  };

  return (
    <>
      <Meta title="Login page" description="test" />
      <div>
        <form onSubmit={handleLogin} className={style.form}>
          <Input
            placeholder="username"
            value={username}
            callback={setUsername}
            type="text"
            height={50}
            width={250}
            fontSize={17}
            label="Username"
            required={true}
            pattern="([a-z]|[0-9]){2,50}"
            data-testid="username-input"
          />

          <Input
            placeholder="password"
            value={password}
            callback={setPassword}
            type="password"
            height={50}
            width={250}
            fontSize={17}
            label="Password"
            required={true}
            pattern="^.{4,}$"
            data-testid="password-input"
          />

          <Button
            text="Log me in"
            height={50}
            width={250}
            label="Login"
            fontSize={17}
            callback={() => {}}
            data-testid="login-button"
          />
        </form>
        <div className={style.register_button}>
          <Button
            text="Don't have an account?"
            height={50}
            width={250}
            label="Registration"
            fontSize={17}
            callback={() => router.push(routes.registration)}
            data-testid="to-register-button"
          />
        </div>
        <div className={style.facebook_button}>
          <Button
            text="Login via favebook"
            height={50}
            width={250}
            label="facebook"
            fontSize={17}
            IconComponent={FacebookIcon}
            callback={() => {
              router.push(
                `${process.env.NEXT_PUBLIC_HOST}${endpoints.facebook()}`

                //? Fake credentials are
                //? username xrzqwtydou_1642517991@tfbnw.net
                //? password Secret0001
              );
            }}
            data-testid="facebook-button"
          />
        </div>
      </div>
    </>
  );
}

export default Login;

export const getServerSideProps = async (context) => {
  //? Check if connect.sid cookie is set
  //? If so, try to retrieve a user
  if (!context.req.cookies["connect.sid"])
    return {
      props: {},
    };

  //* Retrieving a user
  const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.user()}`;

  const fetchedUser = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Cookie: `connect.sid=${context.req.cookies["connect.sid"]}`,
    },
  });

  //? If response is not ok, that means that an error occured
  //? It Should also connect.sid and possible user from coockies
  if (!fetchedUser.ok) {
    context.res.setHeader("Set-cookie", [
      "connect.sid=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
      "user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ]);
    return {
      props: {},
    };
  }

  const user = await fetchedUser.json();

  //* Set token to cookies
  const token = jwt.sign(user, jwtConfig.key);
  context.res.setHeader(
    "Set-cookie",
    `user=${token}; path=${"/"}; Max-Age=${jwtConfig.maxAge}`
  );

  return {
    redirect: {
      destination: routes.user,
      permanent: false,
    },
  };
};
