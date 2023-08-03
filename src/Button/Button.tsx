import { Link } from "react-router-dom";
import "./button.css";
import { ReactNode } from "react";

type ButtonPropsType = {
  children: ReactNode;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  className?: string;
  colorIsRed: boolean;
};

const ButtonStyle = ({
  children,
  type,
  onClick,
  className,
  colorIsRed,
}: ButtonPropsType) => (
  <button
    type={type}
    onClick={onClick}
    className={className + (colorIsRed ? " deleteButton" : " navigationButton")}
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
    <ButtonStyle type="button" colorIsRed={false}>
      {name}{" "}
    </ButtonStyle>
  </Link>
);

export const Button = ({
  children,
  type,
  onClick,
  className,
  colorIsRed,
}: ButtonPropsType) => (
  <ButtonStyle
    type={type}
    onClick={onClick}
    className={className}
    colorIsRed={colorIsRed}
  >
    {children}
  </ButtonStyle>
);
