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

const fetcher = (...args) =>
  axios(...args)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

export default function ListProducts(props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { cid, category } = router.query;
  const { catSelected } = props;

  const urlMainCategory = `${process.env.NEXT_PUBLIC_API_URL}/api/category/cat/${cid}`;
  const urlSubCategory = `${process.env.NEXT_PUBLIC_API_URL}/api/category/sub_cat/${category}/${catSelected}`;

  const url = catSelected == 0 ? urlMainCategory : urlSubCategory;
  const { data, error } = useSWR(url, fetcher);

  // console.log("data", data);
  // console.log("Error", error);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Loading>
        <GridLoader size={50} color='green' />
      </Loading>
    );

  if (data.data) {
    const products = data.data[0] ? data.data[0].Products : [];
    console.log(data);
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
          <h2>No hay productos en la Categoría Seleccionada</h2> <h4>envianos un mensaje consultándonos lo que
          estas buscando.</h4>
        </NoProductsContactForm>
      );
    }
  }
}
