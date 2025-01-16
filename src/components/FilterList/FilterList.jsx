import clsx from "clsx";
import scss from "./FilterList.module.scss";
import FilterIcon from "../FilterIcon/FilterIcon";

const FilterList = ({ name, filters, last = false }) => {
  return (
    <>
      <h3 className={scss.filterName}>{name}</h3>
      <ul className={clsx(scss.filterList, last && scss.last)}>
        {filters.map((filter) => {
          const formatFilterName = (str) =>
            str
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .replace(/-/g, " ")
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Первая буква заглавная
              .join(" ");
          return (
            <FilterIcon
              key={filter}
              svgUrl={filter}
              filterName={formatFilterName(filter)}
            />
          );
        })}
      </ul>
    </>
  );
};

export default FilterList;
