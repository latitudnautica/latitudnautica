import Menu from "../components/Menu";
import styled from "styled-components";

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
    <div>
      <Header>
        <MenuLogo>
          <img src='/images/logo_test.jpg' />
        </MenuLogo>
        <Menu />
      </Header>
      {children}
      <footer>FOOTER</footer>
      <style></style>
    </div>
  );
}
