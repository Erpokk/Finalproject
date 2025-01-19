import IconSvg from "../IconSvg/IconSvg";
import scss from "./ReviewsLocation.module.scss";

const ReviewsLocation = ({ average, location, amount }) => {
  return (
    <div className={scss.ratingWrapper}>
      <div className={scss.truckRating}>
        <IconSvg
          svgId={"star"}
          w={16}
          h={16}
          color={"var(--color-accent-yellow)"}
        />
        <p>
          {average}({amount} Reviews)
        </p>
      </div>
      <div className={scss.locationWrapper}>
        <IconSvg svgId={"icon-Map"} w={16} h={16} color={"black"} />
        <p>{location}</p>
      </div>
    </div>
  );
};

export default ReviewsLocation;
