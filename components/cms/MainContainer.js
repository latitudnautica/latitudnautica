import styled from 'styled-components';
import Link from 'next/link';

const MainContainerStyled = styled.div`
  width: 75vw;
  margin: auto;
`;

const MainContainer = () => (
  <MainContainerStyled>
    <h1> PANEL DE CONTROL DE LATITUD NÁUTICA</h1>
  </MainContainerStyled>
);

export default MainContainer;
