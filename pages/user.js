import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router, { useRouter } from "next/router";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";
import {
  getUser,
  initUser,
  logOutUser,
  selectUser,
  selectUserError,
  updateUser,
} from "../features/UserSlice/UserSlice";
import { routes } from "../config/constants";
import style from "../styles/User/User.module.css";
import { store, wrapper } from "../app/store";

function User() {
  // redux setup

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!user) router.push(routes.login);
  }, [user]);

  const username = user ? user.username : undefined;
  const password = "*******";
  const email = user ? user.email : undefined;
  const firstName = user ? user.first_name : undefined;
  const lastName = user ? user.last_name : undefined;
  // state setup
  // const [username, setUsername] = useState(user ? user.username : undefined);
  // const [password, setPassword] = useState("*******");
  // const [email, setEmail] = useState(user ? user.email : undefined);
  // const [firstName, setFirstName] = useState(
  //   user ? user.first_name : undefined
  // );
  // const [lastName, setLastName] = useState(user ? user.last_name : undefined);

  const [editBoxVisible, setEditBoxVisible] = useState(false);
  const [fieldName, setFieldName] = useState(undefined);
  const [fieldValue, setFieldValue] = useState("");

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
    setFieldName(field);
    setEditBoxVisible(true);
  };

  const cancelButtonHandler = () => {
    setFieldName(undefined);
    setFieldValue("");
    setEditBoxVisible(false);
  };

  const submitFormHandler = () => {
    setFieldName(undefined);
    setFieldValue("");
    setEditBoxVisible(false);
    //redux function
    dispatch(updateUser({ field: fieldName, value: fieldValue, id: user.id }));
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
                label="Edit-first-name"
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
                label="Edit-last-name"
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
                label="Edit-email"
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
                label="Edit-fusername"
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
                label="Edit-password"
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
            callback={() => {
              dispatch(logOutUser(user.id));
              router.push(routes.login);
            }}
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

// export const getServerSideProps = async (context) => {
//   if (!context.req.cookies["connect.sid"])
//     return {
//       redirect: {
//         destination: routes.login,
//         permanent: false,
//       },
//     };

//   return {
//     props: {
//       cookie: context.req.cookies["connect.sid"],
//     },
//   };
// };

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     store.dispatch(
//       initUser({ username: "jor", email: "", last_name: "", first_name: "" })
//     );
//     const user = selectUser(store.getState());
//     console.log(user);
//     if (user)
//       return {
//         props: {
//           username: user.username,
//           password: "******",
//           email: user.email,
//           firstName: user.first_name,
//           lastName: user.last_name,
//         },
//       };
//     return {
//       props: {
//         username: "username",
//         password: "******",
//         email: "your@email.com",
//         firstName: "Name",
//         lastName: "Surname",
//         // username: user.username,
//         // password: "******",
//         // email: user.email,
//         // firstName: user.first_name,
//         // lastName: user.last_name,
//       },
//     };
//   }
// );

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     await store.dispatch(
//       getUser(`connect.sid=${context.req.cookies["connect.sid"]}`)
//     );
//     const user = selectUser(store.getState());

//     if (user)
//       return {
//         props: {
//           user, // not used
//         },
//       };

//     context.res.setHeader(
//       "Set-cookie",
//       "connect.sid=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
//     );
//     return {
//       redirect: {
//         destination: routes.login,
//         permanent: false,
//       },
//     };
//   }
// );
