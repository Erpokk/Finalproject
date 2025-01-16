import Container from "../Container/Container";
import { Navigation } from "../Navigation/Navigation";
import css from "./AppBar.module.css";

export const AppBar = () => {
  return (
    <header className={css.header}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
};
