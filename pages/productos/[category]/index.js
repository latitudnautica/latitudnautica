import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCategories } from "../../../context/CategoriesProvider";
import axios from "axios";
import styled from "styled-components";

import MainLayout from "../../../components/layouts/MainLayout";
import SideBarMenuClient from "../../../components/SideBarMenuClient";
import ListProducts from "../../../components/ListProducts";

const fetcher = (...args) =>
  axios(...args)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

const ListSection = styled.section`
  display: flex;
`;

const ProductsWrapper = ({ params }) => {
  const [products, setProducts] = useState(false);
  const Router = useRouter();
  console.log(Router);

  const { categorySelected, handleClickCategory } = useCategories();

  const getProducts = async () => {
    const urlProductsByCategory = `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${params.cid}`;
    await axios(urlProductsByCategory)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

    return;
  };

  const handleRouteChange = async (url) => {
    console.log("App is changing to: ", Router.query);
    getProducts();
  };

  useEffect(() => {
    // handleClickCategory(Router.query.cid); //set category selected on context
    getProducts();

    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <div>
      <ListSection>
        <SideBarMenuClient categorySelected={categorySelected} />
        <ListProducts products={products} />
      </ListSection>
    </div>
  );
};

ProductsWrapper.Layout = MainLayout;

export default ProductsWrapper;

export async function getServerSideProps({ params }) {
  return { props: { params } };
}
