import React, { useCallback, useState } from "react";
import { Cover } from "./components/Cover";
import "./global.css";
import { LoginForm } from "./components/LoginForm";
import { Modes } from "./constants";
import { SignupForm } from "./components/SignupForm";

export default function App() {
  const [mode, setMode] = useState<Modes>(Modes.Login);

  const setLoginMode = useCallback(() => {
    setMode(Modes.Login);
  }, []);
  const setSignupMode = useCallback(() => {
    setMode(Modes.Signup);
  }, []);

  return (
    <Cover>
      {mode === Modes.Login ? (
        <LoginForm toggleMode={setSignupMode} />
      ) : (
        <SignupForm toggleMode={setLoginMode} />
      )}
    </Cover>
  );
}
