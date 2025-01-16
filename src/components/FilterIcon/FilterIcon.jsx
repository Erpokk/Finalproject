import scss from "./FilterIcon.module.scss";

const FilterIcon = ({ svgUrl, filterName }) => {
  return (
    <li className={scss.filterItem}>
      <svg className={scss.specSvg} width="32" height="32">
        <use href={`/icons.svg#${svgUrl}`} width="32" height="32"></use>
      </svg>
      <p>{filterName}</p>
    </li>
  );
};

export default FilterIcon;
