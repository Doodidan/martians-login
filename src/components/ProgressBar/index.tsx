import React, { FC } from "react";

type ProgressBarProps = { progress: number };

export const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <progress max={1} value={progress}>
      {Math.round(progress * 100)}%
    </progress>
  );
};
