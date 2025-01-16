import clsx from "clsx";
import scss from "./Aside.module.scss";

import Button from "../Button/Button";
import FilterList from "../FilterList/FilterList";

const Aside = () => {
  const vehicleType = ["panelTruck", "fullyIntegrated", "alcove"];
  const vehicleEquipment = [
    "radio",
    "gas",
    "microwave",
    "refrigerator",
    "bathroom",
    "kitchen",
    "automatic",
    "AC",
    "TV",
    "water",
  ];

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
          />
        </div>
      </div>
      <p className={clsx(scss.filters, "body2", "grey-prim")}>Filters</p>
      <FilterList name="Vehicle equipment" filters={vehicleEquipment} />
      <FilterList name="Vehicle type" filters={vehicleType} last={true} />
      <Button>Search</Button>
    </div>
  );
};

export default Aside;
