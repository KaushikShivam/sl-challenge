import React from 'react';
import { Log, sendEvent } from '../../analytics';

interface ButtonProps extends Log {
  text: string;
}

export type Props = ButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

const Button: React.FC<Props> = ({
  text,
  onClick,
  log,
  logLevel,
  category,
  prefix,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sendEvent(text, { log, logLevel, category, prefix });
    if (onClick) onClick(e);
  };

  return (
    <button
      data-test="component-button"
      onClick={handleClick}
      className="Button"
    >
      {text}
    </button>
  );
};

export default Button;
