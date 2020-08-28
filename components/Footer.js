import styled from "styled-components";
import { Container } from "@/components/layouts/commonStyledComponents";
const FooterStyled = styled.footer`
  position: relative;
  /* background-color: ${({ theme }) => theme.colors.background}; */
  display: flex;
  bottom: 1px;
  padding: 2em;

  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;
  border-image-source: ${({theme})=>theme.colors.background};
`;

const Footer = () => {
  return (
    <>
      <FooterStyled>
        <Container>
          <div>Latitud Náutica</div>
          <div>+ de 1000 Productos y artículos para el mundo náutico</div>
        </Container>
      </FooterStyled>
    </>
  );
};

export default Footer;
