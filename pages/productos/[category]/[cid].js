import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

const ProductsPageWrapper = ({ data }) => {
  const Router = useRouter();

  if (Router.isFallback) {
    return <div>cargando...</div>;
  }

  const category = data[0];
  const [products, setProducts] = useState([]);
  const query = Router.query;

  const applyFilter = (scid) => {
    const productsFiltered = category.Products.filter((item) => {
      return item.SubCategoryId == scid;
    });
    setProducts(productsFiltered);
  };

  useEffect(() => {
    setProducts(category.Products);
  }, [data]);

  useEffect(() => {
    if (Router.query.scid) {
      applyFilter(Router.query.scid);
    }
  }, [query]);

  return (
    <div>
      <ListSection>
        <SidebarMenuProducts category={category} />
        <ListProducts products={products} />
      </ListSection>
    </div>
  );
};

ProductsPageWrapper.Layout = MainLayout;

export default ProductsPageWrapper;

export async function getStaticPaths() {
  const categories = await axiosbase(`/category/all`).then((res) => res.data);
  const paths = categories.map((cat) => ({
    params: { category: cat.name, cid: cat.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await axiosbase(`/category/${params.cid}`).then(
    (res) => res.data
  );

  return { props: { data }, revalidate: 1 };
}
