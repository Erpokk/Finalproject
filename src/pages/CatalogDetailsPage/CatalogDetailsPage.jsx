import { useEffect, useState } from "react";
import DocumentTitle from "../../components/DocumentTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchTruckById } from "../../redux/trucksReducer/operations";
import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";

import scss from "./CatalogDetailsPage.module.scss";
import formatFilterName from "../../utils/formatFilterName";
import TruckIconFeature from "../../components/TruckIconFeature/TruckIconFeature";
import BookingForm from "../../components/BookingForm/BookingForm";

export default function CatalogDetailsPage() {
  const dispatch = useDispatch();

  const { campersId } = useParams();
  const [activeTab, setActiveTab] = useState("features");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (campersId) {
      dispatch(fetchTruckById(campersId)); // Загружаем данные только если есть ID
    }
  }, [dispatch, campersId]);

  // Ищем грузовик в Redux
  const truck = useSelector((state) =>
    state.trucks.items.find((item) => item.id === campersId)
  );

  const isLoading = useSelector((state) => state.trucks.isLoading);
  const error = useSelector((state) => state.trucks.error);

  // Обработка загрузки
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Обработка ошибок
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Если данные не найдены
  if (!truck) {
    return <p>Truck not found</p>;
  }

  const totalRating = truck.reviews.reduce(
    (sum, review) => sum + review.reviewer_rating,
    0
  );
  const average =
    truck.reviews.length > 0 ? totalRating / truck.reviews.length : 0;
  console.log("truck :>> ", truck);
  return (
    <div>
      <DocumentTitle>{truck.name}</DocumentTitle>
      <section className={scss.section}>
        <Container>
          <div className={scss.genInfoWrapper}>
            <h1 className="h2">{truck.name}</h1>
            <div className={scss.locationRatingWrapper}>
              <div className={scss.locationWrapper}>
                <svg width="16" height="16">
                  <use href="/icons.svg#star"></use>
                </svg>
                <p>
                  {average}({truck.reviews.length} Reviews)
                </p>
              </div>
              <div className={scss.ratingWrapper}>
                <svg width="16" height="16">
                  <use href="/icons.svg#icon-Map"></use>
                </svg>
                <p>{truck.location}</p>
              </div>
            </div>
            <p className="h2">€{truck.price}.00</p>
          </div>
          <ul className={scss.truckGallery}>
            {truck.gallery.map((photo, index) => (
              <li className={scss.truckGalleryItem} key={photo.original}>
                <img
                  src={photo.original}
                  alt={`Photo №${index + 1} of truck ${truck.name}`}
                />
              </li>
            ))}
          </ul>
          <p className={scss.description}>{truck.description}</p>

          <div className={scss.h3Wrapp}>
            <h3 onClick={() => handleTabClick("features")}>Features</h3>
            <h3 onClick={() => handleTabClick("reviews")}>Reviews</h3>
          </div>
          <div className={scss.featuresBookinWrapper}>
            {activeTab === "features" ? (
              <div className={scss.featuresWrapper}>
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
                <h4>Vehicle details</h4>
                <div className={scss.featureInnerWrapper}>
                  <p>Form</p>
                  <p>{truck.form}</p>
                </div>
                <div className={scss.featureInnerWrapper}>
                  <p>Length</p>
                  <p>{truck.length}</p>
                </div>
                <div className={scss.featureInnerWrapper}>
                  <p>Width</p>
                  <p>{truck.width}</p>
                </div>
                <div className={scss.featureInnerWrapper}>
                  <p>Height</p>
                  <p>{truck.height}</p>
                </div>
                <div className={scss.featureInnerWrapper}>
                  <p>Tank</p>
                  <p>{truck.tank}</p>
                </div>
                <div className={scss.featureInnerWrapper}>
                  <p>Consumption</p>
                  <p>{truck.consumption}</p>
                </div>
              </div>
            ) : (
              <h1>Reviews</h1>
            )}

            <div className={scss.bookingWrapper}>
              <h2>Book your campervan now</h2>
              <p>Stay connected! We are always ready to help you.</p>
              <BookingForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
