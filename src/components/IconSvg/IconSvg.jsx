import clsx from "clsx";
import scss from "./IconSvg.module.scss";

const IconSvg = ({
  svgId,
  w,
  h,
  onClick,
  stroke,
  isActive,
  color = "transparent",
}) => {
  return (
    <svg
      onClick={onClick}
      className={clsx(scss.icon, isActive && scss.active)}
      width={`${w}`}
      height={`${h}`}
      style={{
        "--icon-color": color,
        "--icon-stroke": stroke,
      }}
    >
      <use href={`/icons.svg#${svgId}`}></use>
    </svg>
  );
};

export default IconSvg;
