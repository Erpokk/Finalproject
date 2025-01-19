import formatFilterName from "../../utils/formatFilterName";
import IconSvg from "../IconSvg/IconSvg";
import scss from "./TruckIconFeature.module.scss";

const TruckIconFeature = ({ url, w, h, color, name = false }) => {
  return (
    <li className={scss.optionItem}>
      <IconSvg
        svgId={url}
        w={w}
        h={h}
        color={color}
        stroke={`var(--color-primary-dark)`}
      />
      <p>{formatFilterName(name || url)}</p>
    </li>
  );
};

export default TruckIconFeature;
