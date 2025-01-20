import { useDispatch, useSelector } from "react-redux";
import Truck from "../Truck/Truck";
import scss from "./TrucksList.module.scss";
import { useEffect } from "react";
import {
  fetchAllTrucks,
  fetchFilteredTrucks,
} from "../../redux/trucksReducer/operations";
import Button from "../Button/Button";
import flattenFilters from "../../utils/flattenFilters";
import { resetPage, setPage } from "../../redux/trucksReducer/trucksSlice";
import Loader from "../Loader/Loader";

const TruckList = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.trucks.page);
  const totalCount = useSelector((state) => state.trucks.totalCount);
  const trucks = useSelector((state) => state.trucks.items);
  const isLoading = useSelector((state) => state.trucks.isLoading);
  const error = useSelector((state) => state.trucks.error);
  const filters = useSelector((state) => state.filters);

  const isLastPage = trucks.length === totalCount;

  useEffect(() => {
    dispatch(fetchAllTrucks());
    dispatch(resetPage());
  }, [dispatch]);

  const handleClick = () => {
    if (!isLastPage) {
      const flattenedFilters = flattenFilters(filters); // Преобразуем фильтры
      dispatch(setPage());
      dispatch(
        fetchFilteredTrucks({
          filters: flattenedFilters,
          page: page + 1,
        })
      );
    } else {
      console.log("Last Page");
    }
  };

  return (
    <div className={scss.truckListWrapper}>
      {isLoading && <Loader />}
      {error === "No trucks available (404)" && !isLoading && (
        <h1>No trucks available</h1>
      )}
      {error && !isLoading && error !== "No trucks available (404)" && (
        <h1>Error: {error}</h1>
      )}
      {!isLoading && !error && trucks.length > 0 && (
        <>
          <ul className={scss.truckList}>
            {trucks.map((truck) => (
              <Truck key={truck.id} truck={truck} />
            ))}
          </ul>
          {!isLastPage && (
            <Button
              isLastPage={isLastPage}
              onClick={handleClick}
              option={"lightBtn"}
            >
              Load More
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default TruckList;
