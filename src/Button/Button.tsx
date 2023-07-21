import { Link } from "react-router-dom";
import "./button.css";
import { ReactNode } from "react";

type ButtonPropsType = {
  children: ReactNode;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  className?: string;
};

const ButtonStyle = ({
  children,
  type,
  onClick,
  className,
}: ButtonPropsType) => (
  <button
    type={type}
    onClick={onClick}
    className={className + " navigationButton"}
  >
    {children}
  </button>
);

export const ButtonOfNavigation = ({
  road,
  name,
}: {
  road: string;
  name: string;
}) => (
  <Link to={road}>
    <ButtonStyle type="button">{name}</ButtonStyle>
  </Link>
);

export const Button = ({
  children,
  type,
  onClick,
  className,
}: ButtonPropsType) => (
  <ButtonStyle type={type} onClick={onClick} className={className}>
    {children}
  </ButtonStyle>
);
