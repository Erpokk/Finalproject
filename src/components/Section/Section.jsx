import scss from "./Section.module.scss";

const Section = ({ children }) => {
  return <section className={scss.section}>{children}</section>;
};

export default Section;
