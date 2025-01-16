import clsx from "clsx";
import scss from "./Button.module.scss";

const Button = ({ children }) => {
  return <button className={clsx(scss.btn, "button")}>{children}</button>;
};

export default Button;
