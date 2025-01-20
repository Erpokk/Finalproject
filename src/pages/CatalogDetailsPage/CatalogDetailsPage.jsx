import { useEffect, useState } from "react";
import DocumentTitle from "../../components/DocumentTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchTruckById } from "../../redux/trucksReducer/operations";
import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";

import scss from "./CatalogDetailsPage.module.scss";
import BookingForm from "../../components/BookingForm/BookingForm";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import ReviewsLocation from "../../components/ReviewsLocation/ReviewsLocation";
import clsx from "clsx";
import ParametrList from "../../components/ParametrList/ParametrList";
import Loader from "../../components/Loader/Loader";
import TruckParamList from "../../components/TruckParamList/TruckParamList";

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
    return <Loader />;
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
            <h1 className={clsx(scss.truckName, "h2")}>{truck.name}</h1>
            <ReviewsLocation
              location={truck.location}
              average={average}
              amount={truck.reviews.length}
            />
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
          <p className={clsx(scss.description, "grey-prim")}>
            {truck.description}
          </p>

          <div className={scss.h3Wrapp}>
            <h3
              className={activeTab === "features" ? scss.active : undefined}
              onClick={() => handleTabClick("features")}
            >
              Features
            </h3>
            <h3
              className={activeTab === "reviews" ? scss.active : undefined}
              onClick={() => handleTabClick("reviews")}
            >
              Reviews
            </h3>
          </div>
          <div className={scss.featuresBookinWrapper}>
            {activeTab === "features" ? (
              <div className={scss.featuresWrapper}>
                <TruckParamList truck={truck} />
                <ParametrList
                  parametr={{
                    form: truck.form,
                    length: truck.length,
                    width: truck.width,
                    height: truck.height,
                    tank: truck.tank,
                    consumption: truck.consumption,
                  }}
                  name={"Vehicle details"}
                />
              </div>
            ) : (
              <ReviewsList reviews={truck.reviews} />
            )}

            <div className={scss.bookingWrapper}>
              <h2 className={scss.bookHeading}>Book your campervan now</h2>
              <p className={clsx(scss.bookDesc, "grey-second")}>
                Stay connected! We are always ready to help you.
              </p>
              <BookingForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
