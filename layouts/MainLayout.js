import Menu from "../components/Menu";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
`;
const Header = styled.header`
  border: 1px solid green;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-height: 150px;
`;

const MenuLogo = styled.div`
  img {
    height: 100%;
  }
`;

export default function MainLayout({ children }) {
  return (
    <Container>
      <Header>
        <MenuLogo>
          <img src='/images/logo_test.jpg' />
        </MenuLogo>
        <Menu />
      </Header>
      {children}
      <footer>FOOTER</footer>
      <style></style>
    </Container>
  );
}
