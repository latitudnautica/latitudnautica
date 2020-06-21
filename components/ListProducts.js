import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";

const ListProductsStyled = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductCard = styled.div`
  width: 200px;
  border: 1px solid red;
  margin: 7px;
  padding: 5px;

  img {
    width: 100%;
  }

  header {
    font-size: 1.5em;
  }
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

  const apiUrl = `http://localhost:5000/api/products/${category}/${cid}`;
  const { data, error } = useSWR(apiUrl, fetcher);

  console.log("data", data);
  console.log("Error", error);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <ListProductsStyled>
      {data.data.map((item) => {
        return (
          <ProductCard key={item.id}>
            <img
              src={item.imageUrl ? item.imageUrl : "/images/logo_test.jpg"}
            />
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.price}</div>
          </ProductCard>
        );
      })}
    </ListProductsStyled>
  );
}
