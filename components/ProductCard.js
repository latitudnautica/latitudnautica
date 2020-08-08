import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ButtonProductCard } from "../components/Button";

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
  /* border: 1px solid red; */
  text-align: center;
`;

const ProductName = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`;

const Price = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`;

const Brand = styled.div`
  font-size: 1.1em;
`;

const Code = styled.div`
  font-size: 0.7em;
  margin: 0 5px 0 0;
  text-align: right;
  color: gray;
`;

const DetailButton = styled.button``;
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
        <Code>cod:{item.id}</Code>
        <ProductName>{item.name}</ProductName>
        <Price>$ {item.price}</Price>
        <Brand> {item.brand ? item.brand : "-"}</Brand>
        <Link
          href={`/detalle/[p_name]/[product_id]`}
          as={`/detalle/${item.name}/${item.id}`}
        >
          <a>
            <ButtonProductCard>ver detalles</ButtonProductCard>
          </a>
        </Link>
      </InfoWrapper>
    </ProductCardStyled>
  );
}
