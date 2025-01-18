import clsx from "clsx";
import scss from "./Truck.module.scss";
import formatFilterName from "../../utils/formatFilterName";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import TruckIconFeature from "../TruckIconFeature/TruckIconFeature";

const Truck = ({ truck }) => {
  const navigate = useNavigate();
  const totalRating = truck.reviews.reduce(
    (sum, review) => sum + review.reviewer_rating,
    0
  );
  const average =
    truck.reviews.length > 0 ? totalRating / truck.reviews.length : 0;

  const handleNavigate = () => {
    navigate(`/catalog/${truck.id}`); // Передаём данные через state
  };
  return (
    <li className={scss.truckItem}>
      <img
        className={scss.truckPhoto}
        src={truck.gallery?.[0]?.original || "Not Found"}
        alt={truck.name}
      />
      <div className={scss.truckWrapper}>
        <div className={scss.innerWrapper}>
          <h2>{truck.name}</h2>
          <div className={scss.priceIconWrap}>
            <p className={clsx(scss.truckPrice, "h2")}>€{truck.price}.00</p>
            <svg className={scss.iconHeart}>
              <use href="/icons.svg#heart"></use>
            </svg>
          </div>
        </div>
        <div className={scss.ratingWrapper}>
          <div className={scss.truckRating}>
            <svg className={scss.iconStar} width="16" height="16">
              <use href="/icons.svg#star"></use>
            </svg>
            <p>
              {average}({truck.reviews.length} Reviews)
            </p>
          </div>
          <div className={scss.locationWrapper}>
            <svg className={scss.icon} width="16" height="16">
              <use href="/icons.svg#icon-Map"></use>
            </svg>
            <p>{truck.location}</p>
          </div>
        </div>
        <p className={scss.description}>{truck.description}</p>
        <ul className={scss.optionList}>
          {Object.keys(truck) // Получаем все ключи объекта
            .filter((key) => truck[key] === true) // Проверяем, чтобы значение было true
            .map((key) => (
              <TruckIconFeature key={key} url={key} />
            ))}
          <li className={scss.optionItem}>
            <svg className={scss.optionIcon} width="20" height="20">
              <use href="/icons.svg#engine"></use>
            </svg>
            <p>{formatFilterName(truck.engine)}</p>
          </li>
          <li className={scss.optionItem}>
            <svg className={scss.optionIcon} width="20" height="20">
              <use href="/icons.svg#automatic"></use>
            </svg>
            <p>{formatFilterName(truck.transmission)}</p>
          </li>
        </ul>
        <Button onClick={handleNavigate}>Show more</Button>
      </div>
    </li>
  );
};

export default Truck;
