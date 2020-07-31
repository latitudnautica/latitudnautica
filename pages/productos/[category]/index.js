import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCategories } from "../../../context/CategoriesProvider";
import axios from "axios";
import styled from "styled-components";
import MainLayout from "../../../components/layouts/MainLayout";
import SidebarMenuProducts from "../../../components/SidebarMenuProducts";
import ListProducts from "../../../components/ListProducts";
import { route } from "next/dist/next-server/server/router";

const ListSection = styled.section`
  display: flex;
`;

const ProductsPageWrapper = () => {
  const [products, setProducts] = useState(false);
  const [filter, setFilter] = useState(false);
  const { categorySelected } = useCategories();
  const Router = useRouter();
  const query = Router.query;


  const getProducts = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${query.cid}`;

    await axios(url)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

    return;
  };

  const getProductsFiltered = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/product/filtered/${query.cid}/${query.scid}`;

    await axios(url)
      .then((res) => {
        setProducts(res.data);
      })

      .catch((err) => console.log(err));

    return;
  };

  useEffect(() => {
    if (Router.query.scid) {
      setFilter(Router.query.scid);
      getProductsFiltered();
    } else {
      setFilter(false);
      getProducts();
    }
  }, [query]);

  return (
    <div>
      <ListSection>
        <SidebarMenuProducts categorySelected={categorySelected} />
        <ListProducts products={products} />
      </ListSection>
    </div>
  );
};

ProductsPageWrapper.Layout = MainLayout;

export default ProductsPageWrapper;
