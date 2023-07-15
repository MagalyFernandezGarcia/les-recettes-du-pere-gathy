import { Link } from "react-router-dom";
import "./button.css";

export const ButtonOfNavigation = ({
  road,
  name,
}: {
  road: string;
  name: string;
}) => (
  <button className="navigationButton">
    <Link to={road}> {name} </Link>
  </button>
);
