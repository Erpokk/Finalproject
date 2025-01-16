import clsx from "clsx";
import scss from "./Container.module.scss";

const Container = ({ children, relative = false, isPadding = true }) => {
  return (
    <div
      className={clsx(
        scss.container,
        relative && scss.relative,
        !isPadding && scss.noPadding
      )}
    >
      {children}
    </div>
  );
};

export default Container;
