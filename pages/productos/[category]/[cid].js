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

const ProductsPageWrapper = ({ data }) => {
  const Router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
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

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get categories

  const categories = await axiosbase(`/category/all`).then((res) => res.data);
  // Get the paths we want to pre-render based on posts
  const paths = categories.map((cat) => ({
    params: { category: cat.name, cid: cat.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const data = await axiosbase(`/category/${params.cid}`).then(
    (res) => res.data
  );

  // Pass post data to the page via props
  return { props: { data }, revalidate: 1 };
}
