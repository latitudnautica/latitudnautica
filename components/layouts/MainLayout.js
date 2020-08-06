import styled from "styled-components";
import Headroom from "react-headroom";
import Header from "../Header";
import CategoriesNavbar from "../CategoriesNavbar";

const Container = styled.div`
  position: relative;
  /* width: 100%; */
  min-height: 100vh;
  margin: auto;
`;

const Footer = styled.footer`
  position: absolute;
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
        <main>{children}</main>
        <Footer>FOOTER</Footer>
      </Container>
    </>
  );
}
