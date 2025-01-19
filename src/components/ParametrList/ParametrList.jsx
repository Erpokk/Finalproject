import clsx from "clsx";
import scss from "./ParametrList.module.scss";

const ParametrList = ({ parametr, name }) => {
  return (
    <div>
      <h4 className={clsx(scss.parametrsName, "h3")}>{name}</h4>
      <ul className={scss.paramList}>
        {Object.entries(parametr).map(([key, value], index) => (
          <li className={scss.paramItem} key={index}>
            <p className={"body2"}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </p>{" "}
            {/* Название ключа */}
            <p className={"body2"}>{value}</p> {/* Значение */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParametrList;
