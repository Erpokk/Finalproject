import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Container from "../../components/Container/Container.jsx";

import DocumentTitle from "../../components/DocumentTitle.jsx";
import scss from "./NotFoundPage.module.scss";

export default function HomePage() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <DocumentTitle>Not Found Page</DocumentTitle>
      <section>
        <Container isPadding={false}>
          <div className={scss.hero}>
            <div className={scss.innerWrapper}>
              <h1 className="light">Page Not Found</h1>
              <h2 className="light">Please go back to home page</h2>
            </div>
            <Button onClick={handleNavigate} option={"redBtn"}>
              Go Back Home
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
