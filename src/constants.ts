export enum Modes {
  "Login",
  "Signup",
  "Password",
}

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const pwdLetter = /\w/;
export const pwdNumber = /\d/;
export const pwdSpecial = /[!@#$%^&*)(+=._-]/;
