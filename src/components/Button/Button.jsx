import clsx from "clsx";
import scss from "./Button.module.scss";

const Button = ({ children, onClick, isLastPage, type, option }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={clsx(
        scss.btn,
        isLastPage && scss.disabled,
        option === "redBtn" && scss.redBtn, // Стили для `baseBtn`
        option === "lightBtn" && scss.lightBtn,
        "button"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
