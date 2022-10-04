import React, { ReactNode } from "react";
import { FC } from "react";
import css from "./index.module.css";

type CoverProps = {
  children: ReactNode;
};

export const Cover: FC<CoverProps> = ({ children }) => {
  return <div className={css.hello}>{children}</div>;
};
