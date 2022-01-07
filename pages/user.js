import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router, { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";

import { endpoints, jwtConfig, routes } from "../config/constants";
import style from "../styles/User/User.module.css";

function User({ user }) {
  // const username = user ? user.username : undefined;
  // const password = "*******";
  // const email = user ? user.email : undefined;
  // const firstName = user ? user.first_name : undefined;
  // const lastName = user ? user.last_name : undefined;

  //* State setup
  //* User fields setup
  const [username, setUsername] = useState(user ? user.username : undefined);
  const [password, setPassword] = useState("*******");
  const [email, setEmail] = useState(user ? user.email : undefined);
  const [firstName, setFirstName] = useState(
    user ? user.first_name : undefined
  );
  const [lastName, setLastName] = useState(user ? user.last_name : undefined);

  //* Visibility of edit box setup
  const [editBoxVisible, setEditBoxVisible] = useState(false);

  //* field adn value setup
  //? It should be set for futher sending to the server
  const [fieldName, setFieldName] = useState(undefined);
  const [fieldValue, setFieldValue] = useState("");

  //* Pattern setup
  let pattern = "";
  if (fieldName === "username") {
    pattern = "([a-z]|[0-9]){2,50}";
  }
  if (fieldName === "password") {
    pattern = "([a-z]|[A-Z]|[0-9]){4,50}";
  }
  if (fieldName === "email") {
    pattern = "\b[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}\b";
  }
  if (fieldName === "last_name") {
    pattern = "^[A-Z]{1}[a-z]{1,}$";
  }
  if (fieldName === "first_name") {
    pattern = "^[A-Z]{1}[a-z]{1,}$";
  }

  const editButtonHandler = (field) => {
    //* Show up editbox
    //* Set corresponding name of fieldName
    setFieldName(field);
    setEditBoxVisible(true);
  };

  const cancelButtonHandler = () => {
    //* Hide down editbox
    //* Reset field and value settings
    setFieldName(undefined);
    setFieldValue("");
    setEditBoxVisible(false);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    //? Body should have x-www-form-urlencoded format
    const body = `${"field"}=${encodeURIComponent(
      fieldName
    )}&${"value"}=${encodeURIComponent(fieldValue)}`;

    //? Generating url
    const url = `${process.env.HOST}${endpoints.user()}`;

    //? Should POST data to the server
    const fetched = await fetch(url, {
      method: "PUT",
      credentials: "include",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    //? If update was unsuccessfull, it should display an alert and return now
    if (!fetched.ok)
      return alert(
        "An error occured. This field cannot be updated. Please try again"
      );

    //? Then it should set new jwt
    //* Set token to cookies
    const cookies = new Cookies();
    const token = jwt.sign({ ...user, [fieldName]: fieldValue }, jwtConfig.key);
    cookies.set("user", token, { path: "/", maxAge: jwtConfig.maxAge });

    //? Now it should set new state to display a new value
    if (fieldName === "username") {
      setUsername(fieldValue);
    }
    if (fieldName === "password") {
      setPassword(fieldValue);
    }
    if (fieldName === "email") {
      setEmail(fieldValue);
    }
    if (fieldName === "last_name") {
      setLastName(fieldValue);
    }
    if (fieldName === "first_name") {
      setFirstName(fieldValue);
    }

    //* Hide down editbox
    //* Reset field and value settings
    setFieldName(undefined);
    setFieldValue("");
    setEditBoxVisible(false);
  };

  const logoutHandler = async () => {
    //* Generate url
    const url = `${process.env.HOST}${endpoints.logout()}`;

    //* Send a logout request
    //? It will also reset connect.id cookie
    await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    //* Reset user cookie
    const cookies = new Cookies();
    cookies.remove("user");

    //* Redirect to login page
    router.push(routes.login);
  };

  return (
    <>
      <Meta title="User page" description="test" />
      {!editBoxVisible && (
        <>
          {" "}
          <div className={style.user_details}>
            <div className={style.detail_item}>
              <p className={style.detail_item_text} data-testid="first-name">
                {firstName}
              </p>
              <Button
                text="Edit"
                height={50}
                width={50}
                label="Edit first name"
                data-testid="first-name-button"
                fontSize={17}
                callback={() => editButtonHandler("first_name")}
              />
            </div>
            <div className={style.detail_item}>
              <p className={style.detail_item_text} data-testid="last-name">
                {lastName}
              </p>
              <Button
                text="Edit"
                height={50}
                width={50}
                label="Edit last name"
                data-testid="last-name-button"
                fontSize={17}
                callback={() => editButtonHandler("last_name")}
              />
            </div>
            <div className={style.detail_item}>
              <p className={style.detail_item_text} data-testid="email">
                {email}
              </p>
              <Button
                text="Edit"
                height={50}
                width={50}
                label="Edit email"
                data-testid="email-button"
                fontSize={17}
                callback={() => editButtonHandler("email")}
              />
            </div>
            <div className={style.detail_item}>
              <p className={style.detail_item_text} data-testid="username">
                {username}
              </p>
              <Button
                text="Edit"
                height={50}
                width={50}
                label="Edit username"
                data-testid="username-button"
                fontSize={17}
                callback={() => editButtonHandler("username")}
              />
            </div>
            <div className={style.detail_item}>
              <p className={style.detail_item_text} data-testid="password">
                <span>{password}</span>
              </p>
              <Button
                text="Edit"
                height={50}
                width={50}
                label="Edit password"
                data-testid="password-button"
                fontSize={17}
                callback={() => editButtonHandler("passsword")}
              />
            </div>
          </div>
          <Button
            text="Logout"
            height={50}
            width={250}
            label="Logout"
            fontSize={17}
            callback={logoutHandler}
          />
        </>
      )}
      {editBoxVisible && (
        <div className={style.edit_box} data-testid="edit-box">
          <p data-testid="hint">
            {fieldName === "username" &&
              "Should be lowercase and at least 2 characters in length. No special symbols allowed."}
            {fieldName === "password" &&
              "Should be at least and 4 characters in length. No special symbols allowed."}
            {fieldName === "email" &&
              "Should be in the following format example@domain.com."}
            {fieldName === "first_name" &&
              "Should start with a capitalized letter. No digits or special symbols allowed."}
            {fieldName === "last_name" &&
              "Should start with a capitalized letter. No digits or special symbols allowed."}
          </p>
          <form onSubmit={submitFormHandler}>
            <Input
              width={250}
              height={50}
              fontSize={17}
              value={fieldValue}
              callback={setFieldValue}
              type="text"
              placeholder="Enter new value"
              label="New-value"
              pattern={pattern}
              required={true}
            />
            <div className={style.two_button_container}>
              <Button
                text="Accept"
                height={50}
                width={100}
                label="Accept"
                fontSize={17}
                callback={() => {}}
              />
              <Button
                text="Cancel"
                height={50}
                width={100}
                label="Cancel"
                fontSize={17}
                callback={cancelButtonHandler}
              />
            </div>
          </form>
        </div>
      )}
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

  return {
    props: {
      user,
    },
  };
};
