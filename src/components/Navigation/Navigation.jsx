import { NavLink } from "react-router-dom";
import css from "./Navigation.module.scss";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, "body2", isActive && css.active);
};

export const Navigation = () => {
  return (
    <div className={css.wrapper}>
      <img className={css.logo} src="/logo.svg" />
      <nav className={css.nav}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/catalog">
          Catalog
        </NavLink>
      </nav>
    </div>
  );
};
