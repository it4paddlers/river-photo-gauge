import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

interface ChevronProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

const Chevron: FC<ChevronProps> = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type="button"
    className={clsx([
      'inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500',
      { 'cursor-not-allowed opacity-50': disabled },
    ])}
  >
    {children}
  </button>
);

export default Chevron;
