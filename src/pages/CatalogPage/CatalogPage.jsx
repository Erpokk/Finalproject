import DocumentTitle from "../../components/DocumentTitle.jsx";
import TruckList from "../../components/TrucksList/TrucksList.jsx";
import scss from "./CatalogPage.module.scss";
import Aside from "../../components/Aside/Aside.jsx";
import Container from "../../components/Container/Container.jsx";
import Section from "../../components/Section/Section.jsx";
import { useSelector } from "react-redux";

export default function HomePage() {
  const err = useSelector((state) => state.trucks.error);
  // const isloading = useSelector((state) => state.trucks.isLoading);
  console.log("err :>> ", err);

  return (
    <>
      <DocumentTitle>Catalog</DocumentTitle>
      <Section>
        <Container>
          <div className={scss.wrapper}>
            <Aside />
            {err && <h1>Sorry no trucks</h1>}
            {/*{isloading && <h1>Loading......</h1>}*/}
            {<TruckList />}
          </div>
        </Container>
      </Section>
    </>
  );
}
