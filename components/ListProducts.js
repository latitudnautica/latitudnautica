import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";

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
  const { catSelected } = props;

  const apiUrl = `http://localhost:5000/api/category/sub_cat/${category}/${catSelected}`;
  const urlMainCategory = `http://localhost:5000/api/category/cat/${cid}`;

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
          return (
            <ProductCard key={item.id}>
              <img
                src={item.imageUrl ? item.imageUrl : "/images/logo_test.jpg"}
              />
              <div>id:{item.id}</div>
              <div>catId:{item.categoryId}</div>
              <div>subCat:{item.subCategoryId}</div>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>
                <Link href={`/detalle/${item.name}/${item.id}`}>
                  <a>ver detalles</a>
                </Link>
              </div>
            </ProductCard>
          );
        })}
      </ListProductsStyled>
    );
  }
}
