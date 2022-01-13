import { useEffect, useState } from "react";
import router from "next/router";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";
import Input from "../components/Input/Input";

import { endpoints, jwtConfig, routes } from "../config/constants";
import style from "../styles/Registration/Registration.module.css";

function Registration(props) {
  //* Inputs setup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    //* Retrieving a user
    const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.register()}`;

    //? Body should be ecoded as x-www-form-urlencoded
    const body = `${"username"}=${encodeURIComponent(
      username
    )}&${"password"}=${encodeURIComponent(
      password
    )}&${"email"}=${encodeURIComponent(
      email
    )}&${"first_name"}=${encodeURIComponent(
      firstName
    )}&${"last_name"}=${encodeURIComponent(lastName)}`;

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
      setEmail("");
      setFirstName("");
      setLastName("");
      return;
    }

    const user = await fetchedUser.json();

    //* Set token to cookies
    const token = jwt.sign(user, jwtConfig.key);
    const cookies = new Cookies();
    cookies.set("user", token, { path: "/", maxAge: jwtConfig.maxAge });

    //* Redirecting to user page
    router.push(routes.user);
  };

  return (
    <>
      <Meta title="Registration page" description="test" />
      <div>
        <form className={style.form} onSubmit={handleRegister}>
          <div className={style.form_item}>
            <Input
              placeholder="first name"
              value={firstName}
              callback={setFirstName}
              type="text"
              height={50}
              width={250}
              fontSize={17}
              label="First Name"
              required={true}
              pattern="^[A-Z]{1}[a-z]{1,}$"
              data-testid="first-name"
            />
            <p data-testid="hint">
              Should start with a capitalized letter. No digits or special
              symbols allowed.
            </p>
          </div>

          <div className={style.form_item}>
            <Input
              placeholder="last name"
              value={lastName}
              callback={setLastName}
              type="text"
              height={50}
              width={250}
              fontSize={17}
              label="Last Name"
              required={true}
              pattern="^[A-Z]{1}[a-z]{1,}$"
              data-testid="last-name"
            />
            <p data-testid="hint">
              Should start with a capitalized letter. No digits or special
              symbols allowed.
            </p>
          </div>

          <div className={style.form_item}>
            <Input
              placeholder="email"
              value={email}
              callback={setEmail}
              type="email"
              height={50}
              width={250}
              fontSize={17}
              label="Email"
              required={true}
              pattern="\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b"
              data-testid="email"
            />
            <p data-testid="hint">
              Should be in the following format example@domain.com.
            </p>
          </div>
          <div className={style.form_item}>
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
              data-testid="username"
            />
            <p data-testid="hint">
              Should be lowercase and at least 2 characters in length. No
              special symbols allowed.
            </p>
          </div>
          <div className={style.form_item}>
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
              data-testid="password"
            />
            <p data-testid="hint">
              Should be at least and 4 characters in length.
            </p>
          </div>
          <div className={style.form_item}>
            <Button
              text="Register me"
              height={50}
              width={250}
              label="Register"
              fontSize={17}
              callback={() => {}}
              data-testid="register"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
