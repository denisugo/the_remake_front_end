import { useEffect, useState } from "react";
import router from "next/router";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

import { endpoints, jwtConfig, routes } from "../config/constants";

function useUser(user) {
  //? This should fix a facebook's bug
  useEffect(() => {
    if (window.location.hash === "#_=_") {
      //* Check if the browser supports history.replaceState.
      if (history.replaceState) {
        //* Keep the exact URL up to the hash.
        const cleanHref = window.location.href.split("#")[0];

        //* Replace the URL in the address bar without messing with the back button.
        history.replaceState(null, null, cleanHref);
      } else {
        //* Well, you're on an old browser, we can get rid of the _=_ but not the #.
        window.location.hash = "";
      }
    }
  }, []);

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
    //? This pattern prevent matching 'facebook' in the new username
    pattern = "(^((?!facebook)[a-z]|[0-9]){2,50}$)";
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
    const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.user()}`;

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
    if (!fetched.ok) {
      //? If a message is supplied, display message
      try {
        const message = (await fetched.json()).message;
        return alert(message);
      } catch (error) {}
      return alert(
        "An error occured. This field cannot be updated. Please try again"
      );
    }

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
    const url = `${process.env.NEXT_PUBLIC_HOST}${endpoints.logout()}`;

    //* Send a logout request
    //? It will also reset connect.sid cookie
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

  return {
    editBoxVisible,
    editButtonHandler,
    logoutHandler,
    cancelButtonHandler,
    submitFormHandler,
    pattern,
    username,
    password,
    email,
    firstName,
    lastName,
    fieldName,
    fieldValue,
    setFieldValue,
  };
}

export default useUser;
