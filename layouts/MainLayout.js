import Menu from "../components/Menu";
import styled from "styled-components";
import Headroom from "react-headroom";

const Container = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: auto;

  footer {
    position: absolute;
    bottom: 0px;
  }
`;
const Header = styled.header`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-height: 100px;
`;

const MenuLogo = styled.div`
  margin: 10px;
  img {
    height: 100%;
  }
`;
const BannerFullWidth = styled.div`
  height: 50px;
  background-color: ${({ theme }) => theme.colors.orangeYellowCrayola};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.charcoal};
`;

export default function MainLayout(props) {
  const { children } = props;
  

  return (
    <Container>
      <Headroom>
        <Header>
          <MenuLogo>
            <img src='/images/logo.png' />
          </MenuLogo>
          <Menu />
        </Header>
        <BannerFullWidth>
          Hace tus pedidos por whatsapp, estamos enviando a domicilio
        </BannerFullWidth>
      </Headroom>
      <main>{children}</main>
      <footer>FOOTER</footer>
    </Container>
  );
}
