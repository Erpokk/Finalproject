import clsx from "clsx";
import scss from "./Truck.module.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import TruckIconFeature from "../TruckIconFeature/TruckIconFeature";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/trucksReducer/trucksSlice";
import IconSvg from "../IconSvg/IconSvg";
import ReviewsLocation from "../ReviewsLocation/ReviewsLocation";

const Truck = ({ truck }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalRating = truck.reviews.reduce(
    (sum, review) => sum + review.reviewer_rating,
    0
  );
  const average =
    truck.reviews.length > 0 ? totalRating / truck.reviews.length : 0;

  // Проверяем, находится ли грузовик в списке избранного
  const isFavorite = useSelector((state) =>
    state.trucks.favorites.includes(truck.id)
  );

  // Обработчик клика на иконку
  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(truck.id)); // Переключаем избранное состояние
  };

  const handleNavigate = () => {
    navigate(`/catalog/${truck.id}`); // Передаём данные через state
  };
  console.log("truck :>> ", truck);
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
            <IconSvg
              svgId={"heart"}
              w={26}
              h={24}
              onClick={handleFavoriteClick}
              isActive={isFavorite}
            />
          </div>
        </div>
        <ReviewsLocation
          location={truck.location}
          average={average}
          amount={truck.reviews.length}
        />

        <p className={clsx(scss.description, "grey-prim")}>
          {truck.description}
        </p>
        <ul className={scss.optionList}>
          {Object.keys(truck) // Получаем все ключи объекта
            .filter((key) => truck[key] === true) // Проверяем, чтобы значение было true
            .map((key) => (
              <TruckIconFeature
                key={key}
                url={key}
                w={20}
                h={20}
                color={"transparent"}
              />
            ))}
          <TruckIconFeature url={"engine"} w={20} h={20} name={truck.engine} />
          <TruckIconFeature
            url={"automatic"}
            w={20}
            h={20}
            name={truck.transmission}
          />
        </ul>
        <Button onClick={handleNavigate} option={"redBtn"}>
          Show more
        </Button>
      </div>
    </li>
  );
};

export default Truck;
