import Button from "../../components/Button/Button.jsx";
import Container from "../../components/Container/Container.jsx";

import DocumentTitle from "../../components/DocumentTitle.jsx";
import scss from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <section>
        <Container isPadding={false}>
          <div className={scss.hero}>
            <div className={scss.innerWrapper}>
              <h1>Campers of your dreams</h1>
              <h2 className="light">
                You can find everything you want in our catalog
              </h2>
            </div>
            <Button>View Now</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
