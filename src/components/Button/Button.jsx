import clsx from "clsx";
import scss from "./Button.module.scss";

const Button = ({ children, onClick, isLastPage }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(scss.btn, isLastPage && scss.disabled, "button")}
    >
      {children}
    </button>
  );
};

export default Button;
