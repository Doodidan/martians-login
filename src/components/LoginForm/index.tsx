import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useState,
} from "react";
import css from "./index.module.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { emailRegex } from "../../constants";

type LoginFormProps = {
  toggleMode: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ toggleMode }) => {
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [formError, setFormError] = useState(false);

  const changeEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
    []
  );
  const changePwd = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPwd(event.target.value),
    []
  );

  const [savedPwd] = useLocalStorage(email);

  const loginHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isEmail = !!email && email.toLowerCase().match(emailRegex);
      const isPwd = !!pwd;

      setEmailError(!isEmail);
      setPwdError(!isPwd);

      if (isEmail && isPwd) {
        if (savedPwd === pwd) {
          setFormError(false);
          alert("Success");
        } else {
          setFormError(true);
        }
      }
    },
    [email, savedPwd, pwd]
  );

  return (
    <form className={css.form} onSubmit={loginHandler}>
      <label className={css.form__email_container}>
        <h1 className={css.form__field_title}>Email:</h1>
        <input
          className={css.form__input}
          type={"email"}
          onChange={changeEmail}
          value={email}
          required
        />
        <p className={css.form__error}>
          {emailError ? "Enter correct email" : null}
        </p>
      </label>
      <label className={css.form__password_container}>
        <h1 className={css.form__field_title}>Password</h1>
        <input
          className={css.form__input}
          type={"password"}
          onChange={changePwd}
          value={pwd}
          required
        />
        <p className={css.form__error}>{pwdError ? "Enter password" : null}</p>
      </label>

      <p className={css.form__error}>
        {formError ? "Incorrect email or password" : null}
      </p>

      <div className={css.form__links_container}>
        <a className={css.form__link} tabIndex={0}>
          Forgot password?
        </a>
        <button className={css.form__submit} type={"submit"}>
          Log in
        </button>
      </div>
      <a
        className={`${css.form__link} ${css.form__sign_up}`}
        tabIndex={0}
        onClick={toggleMode}
      >
        Sign up
      </a>
    </form>
  );
};
