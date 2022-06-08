import React, { FC, ReactNode } from 'react';

import classes from './Button.module.css';

export interface ButtonProps {
  enabled: boolean;
  onPress?: () => void;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ enabled, onPress, children }) => {
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
