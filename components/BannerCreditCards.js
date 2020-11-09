/* eslint-disable import/no-unresolved */
import BannerFullWidth from '@/components/BannerFullWidth';
import styled from 'styled-components';
import Image from 'next/image';

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
      <Image
        src='/images/credit/visa-logo.svg'
        alt='logo tarjeta de crédito visa'
        width={150}
        height={90}
      />
    </ImageWrapper>
    <ImageWrapper>
      <Image
        src='/images/credit/mastercard-logo.svg'
        alt='logo tarjeta de crédito master card'
        width={150}
        height={90}
      />
    </ImageWrapper>
    <ImageWrapper>
      <Image
        src='/images/credit/cabal-logo.png'
        alt='logo tarjeta de crédito cabal'
        width={150}
        height={90}
      />
    </ImageWrapper>
  </BannerCreditsCardStyled>
);

export default BannerCreditCards;
