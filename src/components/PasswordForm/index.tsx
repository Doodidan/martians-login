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

type PasswordFormProps = {
  setLoginMode: () => void;
  setSignupMode: () => void;
};

export const PasswordForm: FC<PasswordFormProps> = ({
  setLoginMode,
  setSignupMode,
}) => {
  const [email, setEmail] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [formError, setFormError] = useState(false);

  const [formInfo, setFormInfo] = useState<string | undefined>();

  const changeEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
    []
  );
  const changeCaptcha = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setCaptcha(event.target.value),
    []
  );

  const [savedPwd] = useLocalStorage(email);

  const showPwd = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isEmail = !!email && email.toLowerCase().match(emailRegex);
      const isCaptcha = !!captcha && captcha === "89";

      setEmailError(!isEmail);
      setCaptchaError(!isCaptcha);

      if (isEmail && isCaptcha) {
        if (savedPwd) {
          setFormInfo("Your password is " + savedPwd);
          setFormError(false);
        } else {
          setFormInfo("Account is not found");
          setFormError(true);
        }
      }
    },
    [email, savedPwd, captcha]
  );

  return (
    <form className={css.form} onSubmit={showPwd}>
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
      <label className={css.form__captcha_container}>
        <h1 className={css.form__field_title}>What's 80 + 9?</h1>
        <input
          className={css.form__input}
          type={"text"}
          onChange={changeCaptcha}
          value={captcha}
          required
        />
        <p className={css.form__error}>{captchaError ? "Wrong!" : null}</p>
      </label>

      <button className={css.form__submit} type={"submit"}>
        Restore password
      </button>

      <p className={formError ? css.form__error : css.form__info}>
        {formInfo ?? null}
      </p>

      <div className={css.form__links_container}>
        <a className={css.form__link} tabIndex={0} onClick={setSignupMode}>
          Sign up
        </a>
        <a className={css.form__link} tabIndex={0} onClick={setLoginMode}>
          Log in
        </a>
      </div>
    </form>
  );
};
