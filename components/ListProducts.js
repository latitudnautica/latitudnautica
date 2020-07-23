import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import GridLoader from "react-spinners/GridLoader";

const ListProductsStyled = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const Loading = styled.div`
  margin: auto;
`;
const NoProductsContactForm = styled.div`
  margin: auto;
  text-align: center;
`;

export default function ListProducts(props) {
  const { products } = props;
  // console.log("Products", products);

  if (!products)
    return (
      <Loading>
        <GridLoader size={50} color='green' />
      </Loading>
    );

  if (products) {
    // console.log(data);
    if (products.length !== 0) {
      return (
        <ListProductsStyled>
          {products.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
        </ListProductsStyled>
      );
    } else {
      return (
        <NoProductsContactForm>
          <h2>No hay productos en la Categoría Seleccionada</h2>{" "}
          <h4>envianos un mensaje consultándonos lo que estas buscando.</h4>
        </NoProductsContactForm>
      );
    }
  }
}
