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
import { setPage } from "../../redux/trucksReducer/trucksSlice";

const TruckList = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.trucks.page);
  const totalCount = useSelector((state) => state.trucks.totalCount);
  const trucks = useSelector((state) => state.trucks.items);
  const filters = useSelector((state) => state.filters);

  const isLastPage = trucks.length == totalCount;

  useEffect(() => {
    dispatch(fetchAllTrucks());
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
      <ul className={scss.truckList}>
        {trucks.map((truck) => (
          <Truck key={truck.id} truck={truck} />
        ))}
      </ul>
      <Button isLastPage={isLastPage} onClick={handleClick} option={"lightBtn"}>
        Load More
      </Button>
    </div>
  );
};

export default TruckList;
