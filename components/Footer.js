import styled from 'styled-components';

const FooterStyled = styled.footer`
  position: relative;
 
  text-align: center;
  bottom: 1px;
  padding: 2em;

  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;
  border-image-source: ${({ theme }) => theme.colors.background};
`;

const Footer = () => (
  <>
    <FooterStyled>
      <div>Latitud Náutica</div>
      <div> Productos y Artículos para el Mundo Náutico</div>
      <div>Copyright 2020 Latitud Náutica  </div>
    </FooterStyled>
  </>
);

export default Footer;
