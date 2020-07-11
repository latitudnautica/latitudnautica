import styled from "styled-components";
import Headroom from "react-headroom";
import Header from "../Header";

const Container = styled.div`
  /* max-width: 1300px; */
  width: 100%;
  margin: auto;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0px;
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.orangeYellowCrayola};
`;

export default function MainLayout(props) {
  const { children } = props;

  return (
    <>
      <Headroom>
        <Header />
      </Headroom>
      <Container>
        <main>{children}</main>
        <Footer>FOOTER</Footer>
      </Container>
    </>
  );
}
