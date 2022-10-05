import React, { FC, useCallback, useState } from "react";
import { Cover } from "./components/Cover";
import "./global.css";
import { LoginForm } from "./components/LoginForm";
import { Modes } from "./constants";
import { SignupForm } from "./components/SignupForm";
import { PasswordForm } from "./components/PasswordForm";

type AppProps = {};

export const App: FC<AppProps> = () => {
  const [mode, setMode] = useState<Modes>(Modes.Login);

  console.log(setMode, "setMode");

  const setLoginMode = useCallback(() => {
    setMode(Modes.Login);
  }, []);
  const setSignupMode = useCallback(() => {
    setMode(Modes.Signup);
  }, []);
  const setPasswordMode = useCallback(() => {
    setMode(Modes.Password);
  }, []);

  return (
    <Cover>
      {mode === Modes.Login ? (
        <LoginForm
          setSignupMode={setSignupMode}
          setPasswordMode={setPasswordMode}
        />
      ) : mode === Modes.Signup ? (
        <SignupForm setLoginMode={setLoginMode} />
      ) : (
        <PasswordForm
          setLoginMode={setLoginMode}
          setSignupMode={setSignupMode}
        />
      )}
    </Cover>
  );
};
