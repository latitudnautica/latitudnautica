import styled from "styled-components";
import Header from "../Header";
import CategoriesNavbar from "../CategoriesNavbar";

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  margin: auto 10px;
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
      <CategoriesNavbar />
      <Container>{children}</Container>
      <Footer>FOOTER</Footer>
    </>
  );
}
