import clsx from "clsx";
import scss from "./Truck.module.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/trucksReducer/trucksSlice";
import IconSvg from "../IconSvg/IconSvg";
import ReviewsLocation from "../ReviewsLocation/ReviewsLocation";
import TruckParamList from "../TruckParamList/TruckParamList";

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
    navigate(`/catalog/${truck.id}`);
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
              color={"black"}
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
        <TruckParamList truck={truck} />
        <Button onClick={handleNavigate} option={"redBtn"}>
          Show more
        </Button>
      </div>
    </li>
  );
};

export default Truck;
