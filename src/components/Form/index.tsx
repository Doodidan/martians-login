import React, { FC } from "react";
import css from "./index.module.scss";

type FormProps = {};

export const Form: FC<FormProps> = () => {
  return (
    <form className={css.form}>
      <div className={css.form__email_container}>
        <h1 className={css.form__field_title}>Email:</h1>
        <input type={"email"} />
      </div>
      <div className={css.form__password_container}>
        <h1 className={css.form__field_title}>Password</h1>
        <input type={"password"} />
      </div>
      <div className={css.form__links_container}>
        <a className={css.form__link} tabIndex={0}>
          Forgot password?
        </a>
        <button type={"submit"} className={css.form__submit}>
          Log in
        </button>
      </div>
      <a className={`${css.form__link} ${css.form__sign_up}`} tabIndex={0}>
        Sign up
      </a>
    </form>
  );
};
