import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCategories } from "../../../context/CategoriesProvider";
import axios from "axios";
import styled from "styled-components";
import MainLayout from "../../../components/layouts/MainLayout";
import SideBarMenuClient from "../../../components/SideBarMenuClient";
import ListProducts from "../../../components/ListProducts";

const ListSection = styled.section`
  display: flex;
`;

const ProductsWrapper = () => {
  const [products, setProducts] = useState(false);
  const { categorySelected } = useCategories();
  const Router = useRouter();
  const query = Router.query;


  const getProducts = async () => {

    const urlProductsByCategory = `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${query.cid}`;

    await axios(urlProductsByCategory)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

    return;
  };

  useEffect(() => {
    getProducts();
 
  }, [query]);

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