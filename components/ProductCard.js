import React from "react";
import styled from "styled-components";
import Link from "next/link";

const ProductCardStyled = styled.div`
  width: 230px;
  margin: 10px;
  padding: 5px;
  border: solid thin #ccc;
  /* box-shadow: 0px 0px 14px -5px gray; */
  transition: all 0.2s ease;
  max-height: 310px;

  img {
    width: 100%;
  }

  header {
    font-size: 1.5em;
  }
  :hover {
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.4);
  }
`;

export default function ProductCard(props) {
  const { item } = props;

  return (
    <ProductCardStyled key={item.id}>
      {item.imagePath ? (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.imagePath}`}
          alt={`Imagen < ${item.name} >`}
        />
      ) : (
        <img src='/images/logo_test.jpg' alt={`Imagen < ${item.name} >`} />
      )}
      <div>
        <b>{item.name}</b>
      </div>
      <div>id:{item.id}</div>
      <div>$ {item.price}</div>
      <hr />
      <div>catId:{item.categoryId}</div>
      <div>subCat:{item.subCategoryId}</div>
      <div>
        <Link
          href={`/detalle/[p_name]/[product_id]`}
          as={`/detalle/${item.name}/${item.id}`}
        >
          <a>ver detalles</a>
        </Link>
      </div>
    </ProductCardStyled>
  );
}
