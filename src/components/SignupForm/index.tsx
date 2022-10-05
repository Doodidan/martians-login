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

type SignupFormProps = {
  toggleMode: () => void;
};

export const SignupForm: FC<SignupFormProps> = ({ toggleMode }) => {
  const [email, setEmail] = useState<string>("");
  const [email2, setEmail2] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [email2Error, setEmail2Error] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const changeEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
    []
  );
  const changeEmail2 = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEmail2(event.target.value),
    []
  );
  const changePwd = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPwd(event.target.value),
    []
  );

  const [_, setSavedPwd] = useLocalStorage(email);

  const saveForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isEmail = !!email && email.toLowerCase().match(emailRegex);
      const isEmail2 = email === email2;
      const isPwd = !!pwd;

      setEmailError(!isEmail);
      setEmail2Error(!isEmail2);
      setPwdError(!isPwd);

      if (isEmail && isEmail2 && isPwd) {
        setSavedPwd(pwd);
        alert("Success!");
        toggleMode();
      }
    },
    [email, email2, pwd, setSavedPwd, toggleMode]
  );

  return (
    <form className={css.form} onSubmit={saveForm}>
      <label className={css.form__email_container}>
        <h1 className={css.form__field_title}>Email:</h1>
        <input type={"email"} onChange={changeEmail} value={email} required />
        <p className={css.form__error}>
          {emailError ? "Enter correct email" : null}
        </p>
      </label>
      <label className={css.form__email_container}>
        <h1 className={css.form__field_title}>Repeat email:</h1>
        <input type={"email"} onChange={changeEmail2} value={email2} required />
        <p className={css.form__error}>
          {email2Error ? "Emails do not match each other" : null}
        </p>
      </label>
      <label className={css.form__password_container}>
        <h1 className={css.form__field_title}>Password</h1>
        <input type={"password"} onChange={changePwd} value={pwd} required />
        <p className={css.form__error}>{pwdError ? "Enter password" : null}</p>
      </label>

      <div className={css.form__links_container}>
        <button type={"submit"} className={css.form__submit}>
          Sign up
        </button>
      </div>
      <a
        className={`${css.form__link} ${css.form__sign_up}`}
        tabIndex={0}
        onClick={toggleMode}
      >
        Log in
      </a>
    </form>
  );
};
