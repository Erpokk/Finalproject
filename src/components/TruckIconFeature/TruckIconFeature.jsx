import formatFilterName from "../../utils/formatFilterName";
import scss from "./TruckIconFeature.module.scss";

const TruckIconFeature = ({ url }) => {
  return (
    <li className={scss.optionItem}>
      <svg className={scss.optionIcon} width="20" height="20">
        <use href={`/icons.svg#${url}`}></use>
      </svg>
      <p>{formatFilterName(url)}</p>
    </li>
  );
};

export default TruckIconFeature;
