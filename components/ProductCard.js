import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import onImageError from '@/utils/onImageError';
import { ButtonProductCard } from './layouts/Button';

const ImageWrapper = styled.div`
  padding: 10px;
  transition: transform 0.3s ease-out;
  transform: scale(0.95);
  border-bottom: 2px solid #f7f7f7;
  min-height: 200px;

  img {
    max-height: 200px;
    height: 200px;
    width: 100%;
    object-fit: contain;
  }
`;

const ProductCardStyled = styled.div`
  width: 220px;
  margin: 8px;
  border: solid thin #ccc;
  /* box-shadow: 0px 0px 14px -5px gray; */
  transition: all 0.2s ease;
  border-radius: 8px;

  &:hover ${ImageWrapper} {
    transform: scale(1);
  }
`;

const InfoWrapper = styled.div`
  text-align: center;
`;

const ProductName = styled.div`
  font-family: 'Neucha';
  letter-spacing: 1px;
  color: #4a4c58;
  font-size: 1.4em;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0.6em 0;
`;

const Price = styled.div`
  font-size: 1.3em;
  font-weight: 400;
  position: relative;
  margin-bottom: 10px;
`;
const Currency = styled.span`
  position: relative;
  font-size: 0.7em;
  top: -2px;
`;

const Brand = styled.div`
  font-size: 1em;
  text-transform: uppercase;
`;

export default function ProductCard(props) {
  const { item } = props;
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <ProductCardStyled key={item.id} title={item.id}>
      <animated.div style={fade}>
        <ImageWrapper>
          <img
            onError={onImageError}
            src={`${process.env.NEXT_PUBLIC_API_URL + item.imagePath}`}
            alt={`Imagen < ${item.name} >`}
            title={`Imagen < ${item.imageName} >`}
          />
        </ImageWrapper>
        <InfoWrapper>
          <ProductName>{item.name}</ProductName>
          <Price>
            <Currency>{`${item.currency ? item.currency : '$'}`}</Currency>
            <span> {`${item.price}`}</span>
          </Price>
          <Brand>{item.brand ? item.brand : '-'}</Brand>
          <Link
            href='/detalle/[p_name]/[product_id]'
            as={`/detalle/${item.name}/${item.id}`}
          >
            <a>
              <ButtonProductCard>ver detalles</ButtonProductCard>
            </a>
          </Link>
        </InfoWrapper>
      </animated.div>
    </ProductCardStyled>
  );
}
