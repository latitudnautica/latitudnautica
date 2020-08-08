import styled from "styled-components";
import Header from "../Header";
import CategoriesNavbar from "../CategoriesNavbar";

const Container = styled.div`
  position: relative;
  /* width: 100%; */
  min-height: 100vh;
  margin: auto;
`;

const Footer = styled.footer`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  bottom: 0px;

  width: 100%;
  max-width: 100vw;
  height: 2.5rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.orangeYellowCrayola};
`;

export default function MainLayout(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <Container>
        <CategoriesNavbar />
        <section>{children}</section>
      </Container>
        <Footer>FOOTER</Footer>
    </>
  );
}
