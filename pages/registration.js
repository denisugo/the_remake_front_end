import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";

import Button from "../components/Button/Button";
import Meta from "../components/Head/Meta";
import Input from "../components/Input/Input";
import {
  registerUser,
  selectUser,
  selectUserError,
} from "../features/UserSlice/UserSlice";
import { routes } from "../config/constants";
import style from "../styles/Registration/Registration.module.css";

function Registration(props) {
  // Inputs setup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (user && !error) router.push(routes.user);
    if (error) {
      setPassword("");
      setUsername("");
      setEmail("");
      setFirstName("");
      setLastName("");
    }
  }, [user, error]);

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(
      registerUser({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      })
    );
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
              label="First-Name"
              required={true}
              pattern="^[A-Z]{1}[a-z]{1,}$"
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
              label="Last-Name"
              required={true}
              pattern="^[A-Z]{1}[a-z]{1,}$"
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
              pattern="([a-z]|[A-Z]|[0-9]){4,50}"
            />
            <p data-testid="hint">
              Should be at least and 4 characters in length. No special symbols
              allowed.
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
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
