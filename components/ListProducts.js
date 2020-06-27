import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";

const ListProductsStyled = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const fetcher = (...args) =>
  axios(...args)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

export default function ListProducts(props) {
  const router = useRouter();
  const { cid, category } = router.query;
  const { catSelected } = props;

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/category/sub_cat/${category}/${catSelected}`;
  const urlMainCategory = `${process.env.NEXT_PUBLIC_API_URL}/api/category/cat/${cid}`;

  const url = props.catSelected != 0 ? apiUrl : urlMainCategory;
  const { data, error } = useSWR(url, fetcher);

  // console.log("data", data);
  // console.log("Error", error);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  if (data) {
    const Products = data.data[0] ? data.data[0].Products : [];
    // console.log(Products);

    return (
      <ListProductsStyled>
        {Products.map((item) => {
          return <ProductCard key={item.id} item={item} />;
        })}
      </ListProductsStyled>
    );
  }
}
