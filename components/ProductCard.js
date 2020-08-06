import React from "react";
import styled from "styled-components";
import Link from "next/link";

const ImageWrapper = styled.div`
  padding: 10px;
  transition: transform 0.3s ease-out;
  transform: scale(0.95);
  img {
    width: 100%;
  }
`;

const ProductCardStyled = styled.div`
  width: 220px;
  margin: 10px;
  border: solid thin #ccc;
  /* box-shadow: 0px 0px 14px -5px gray; */
  transition: all 0.2s ease;
  border-radius: 8px;

  &:hover ${ImageWrapper} {
    transform: scale(1);
  }
`;

const InfoWrapper = styled.div`
  border: 1px solid red;
  text-align: center;
`;

const ProductName = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`;

const Price = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`;

const Brand = styled.div`
  font-size: 1.1em;
`;

const DetailButton = styled.button`

`
export default function ProductCard(props) {
  const { item } = props;

  return (
    <ProductCardStyled key={item.id} title={item.id}>
      <ImageWrapper>
        {item.imagePath ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.imagePath}`}
            alt={`Imagen < ${item.name} >`}
          />
        ) : (
          <img src="/images/logo_test.jpg" alt={`Imagen < ${item.name} >`} />
        )}
      </ImageWrapper>
      <InfoWrapper>
        <ProductName>{item.name}</ProductName>
        <Price>$ {item.price}</Price>
        <Brand> {item.brand}</Brand>
        <Link
          href={`/detalle/[p_name]/[product_id]`}
          as={`/detalle/${item.name}/${item.id}`}
        >
          <a>
            <DetailButton>ver detalles</DetailButton>
          </a>
        </Link>
        <div>producto id: {item.Id}</div>
      </InfoWrapper>
    </ProductCardStyled>
  );
}
