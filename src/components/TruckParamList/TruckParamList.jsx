import TruckIconFeature from "../TruckIconFeature/TruckIconFeature";
import scss from "./TruckParamList.module.scss";
const TruckParamList = ({ truck }) => {
  return (
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
  );
};

export default TruckParamList;
