import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCategories } from "../../../context/CategoriesProvider";
import axiosbase from "../../../utils/axiosBase";
import styled from "styled-components";
import MainLayout from "../../../components/layouts/MainLayout";
import SidebarMenuProducts from "../../../components/SidebarMenuProducts";
import ListProducts from "../../../components/ListProducts";

const ListSection = styled.section`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    display: block;
    /* flex-direction: column; */
  }
`;

const ProductsPageWrapper = () => {
  const [products, setProducts] = useState(false);
  const [filter, setFilter] = useState(false);
  const { categorySelected } = useCategories();
  const Router = useRouter();
  const query = Router.query;

  const getProducts = async () => {
    await axiosbase(`/product/category/${query.cid}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

    return;
  };

  const getProductsFiltered = async () => {
    await axiosbase(`/product/filtered/${query.cid}/${query.scid}`)
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
