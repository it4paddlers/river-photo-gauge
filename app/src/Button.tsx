import React, { FC } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  enabled: boolean;
  onPress?: () => void;
}

const Button: FC<ButtonProps> = ({ enabled, onPress, children }) => {
  return (
    <button
      disabled={!enabled}
      className={enabled ? classes.enabled : classes.disabled}
      onClick={() => onPress?.()}
    >
      {children}
    </button>
  );
};

export default Button;
