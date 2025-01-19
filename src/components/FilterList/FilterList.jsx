import clsx from "clsx";
import scss from "./FilterList.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleFilter } from "../../redux/filterReducer/filterSlice";
import formatFilterName from "../../utils/formatFilterName";
// import IconItem from "../IconItem/IconItem";
import FilterIcon from "../FilterIcon/FilterIcon";

const FilterList = ({ name, category, last = false }) => {
  const filters = useSelector((state) => state.filters[category]); // Данные фильтров из Redux
  const dispatch = useDispatch();

  const handleFilterClick = (key) => {
    dispatch(toggleFilter({ category, key })); // Переключаем фильтр
  };
  return (
    <>
      <h3 className={scss.filterName}>{name}</h3>
      <ul className={clsx(scss.filterList, last && scss.last)}>
        {Object.keys(filters).map((filter) => {
          return (
            <FilterIcon
              onClick={() => handleFilterClick(filter)}
              active={filters[filter]}
              key={filter}
              svgUrl={filter}
              filterName={formatFilterName(filter)}
              color={"black"}
              w={32}
              h={32}
            />
          );
        })}
      </ul>
    </>
  );
};

export default FilterList;
