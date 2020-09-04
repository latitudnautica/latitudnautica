/* eslint-disable import/no-unresolved */
import BannerFullWidth from '@/components/BannerFullWidth';
import styled from 'styled-components';

const BannerCreditsCardStyled = styled(BannerFullWidth)`
  display: flex;
`;
const ImageWrapper = styled.div`
  width: 150px;
  margin: 1em;

  img {
    width: 100%;
  }
`;

const BannerCreditCards = () => (
  <BannerCreditsCardStyled>
    <ImageWrapper>
      <img
        src='/images/credit/visa-logo.svg'
        alt='logo tarjeta de crédito visa'
      />
    </ImageWrapper>
    <ImageWrapper>
      <img
        src='/images/credit/mastercard-logo.svg'
        alt='logo tarjeta de crédito master card'
      />
    </ImageWrapper>
    <ImageWrapper>
      <img
        src='/images/credit/cabal-logo.png'
        alt='logo tarjeta de crédito cabal'
      />
    </ImageWrapper>
  </BannerCreditsCardStyled>
);

export default BannerCreditCards;
