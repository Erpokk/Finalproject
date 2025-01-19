import clsx from "clsx";
import scss from "./Aside.module.scss";

import Button from "../Button/Button";
import FilterList from "../FilterList/FilterList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTrucks,
  fetchFilteredTrucks,
} from "../../redux/trucksReducer/operations";
import flattenFilters from "../../utils/flattenFilters";
import { resetTrucks } from "../../redux/trucksReducer/trucksSlice";
import {
  resetFilters,
  setLocation,
} from "../../redux/filterReducer/filterSlice";
import { useEffect } from "react";

const Aside = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters); // Получаем фильтры из Redux
  const location = useSelector((state) => state.filters.location); // Получаем location из Redux

  const handleLocationChange = (event) => {
    const value = event.target.value;
    dispatch(setLocation(value)); // Сохраняем location в Redux
  };

  const handleClick = () => {
    const flattenedFilters = flattenFilters(filters); // Преобразуем фильтры
    console.log("flattenedFilters :>> ", flattenedFilters);
    dispatch(resetTrucks());
    dispatch(fetchFilteredTrucks({ filters: flattenedFilters })); // Передаём плоские фильтры
  };

  const handleReset = () => {
    dispatch(resetTrucks());
    dispatch(resetFilters());
    dispatch(fetchAllTrucks());
  };

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <div className={scss.mainWrapper}>
      <div className={scss.locationWrapper}>
        <label
          htmlFor="location-input"
          className={clsx(scss.location, "body", "grey-second")}
        >
          Location
        </label>
        <div className={scss.wrapper}>
          <svg className={scss.icon} width="20" height="20">
            <use href="/icons.svg#icon-Map"></use>
          </svg>
          <input
            className={scss.input}
            type="text"
            placeholder="Kyiv, Ukraine"
            id="location-input"
            name="location-input"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>
      <p className={clsx(scss.filters, "body2", "grey-prim")}>Filters</p>
      <FilterList name="Vehicle equipment" category="vehicleEquipment" />
      <FilterList name="Vehicle type" category="vehicleType" last={true} />
      <div className={scss.btnWrapper}>
        <Button onClick={handleClick} option={"redBtn"}>
          Search
        </Button>
        <Button onClick={handleReset} option={"lightBtn"}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Aside;
