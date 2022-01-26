import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Meta from "../../components/Head/Meta";
import style from "../../styles/User/Desktop/User.module.css";

function UserDesktop({
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
}) {
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
            data-testid="logout"
          />
        </>
      )}
      {editBoxVisible && (
        <div className={style.edit_box} data-testid="edit-box">
          <p data-testid="hint">
            {fieldName === "username" &&
              "Should be lowercase and at least 2 characters in length. No special symbols allowed. Cannot contain 'facebook' word within your username."}
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
                data-testid="accept"
              />
              <Button
                text="Cancel"
                height={50}
                width={100}
                label="Cancel"
                fontSize={17}
                callback={cancelButtonHandler}
                data-testid="cancel"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default UserDesktop;
