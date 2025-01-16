import { useEffect } from "react";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import { useDispatch } from "react-redux";
import { fetchTrucks } from "../../redux/trucksReducer/operations.js";
import TruckList from "../../components/TrucksList/TrucksList.jsx";
import scss from "./CatalogPage.module.scss";
import Aside from "../../components/Aside/Aside.jsx";
import Container from "../../components/Container/Container.jsx";
import Section from "../../components/Section/Section.jsx";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrucks());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Catalog</DocumentTitle>
      <Section>
        <Container>
          <div className={scss.wrapper}>
            <Aside />
            <TruckList />
          </div>
        </Container>
      </Section>
    </>
  );
}
