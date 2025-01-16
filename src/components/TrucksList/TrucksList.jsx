import { useSelector } from "react-redux";
import Truck from "../Truck/Truck";
import scss from "./TrucksList.module.scss";

const TruckList = () => {
  const trucks = useSelector((state) => state.trucks.items);
  console.log(trucks);
  return (
    <ul className={scss.truckList}>
      {trucks.map((truck) => (
        <Truck key={truck.id} truck={truck} />
      ))}
    </ul>
  );
};

export default TruckList;
