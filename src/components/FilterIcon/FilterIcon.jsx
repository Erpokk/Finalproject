import clsx from "clsx";
import scss from "./FilterIcon.module.scss";
import IconSvg from "../IconSvg/IconSvg";

const FilterIcon = ({
  svgUrl,
  filterName,
  active,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className={clsx(
        scss.filterItem,
        active && scss.active,

      )}
    >
      <IconSvg
        svgId={svgUrl}
        w={32}
        h={32}
        stroke={"var(--color-primary-dark)"}
      />
      <p>{filterName}</p>
    </li>
  );
};

export default FilterIcon;
