import { useState } from "react";
import MainLayout from "../../../../layouts/MainLayout";
import { useRouter } from "next/router";
import CategoryMenuProps from "../../../../components/categoryMenuProps";
import SideBarMenu from "../../../../components/SideBarMenu";
import styled from "styled-components";
import ListProducts from "../../../../components/ListProducts";

const ListSection = styled.section`
  display: flex;
`;

const Product = (props) => {
  const router = useRouter();
  const { categories } = props;
  const subCategories = categories[router.query.cid - 1].SubCategories;
  const [catSelected, setCatSelected] = useState(0);

  const handleCatSelected = (e) => {
    const id = e.target.dataset.cid;
    setCatSelected(id);
  };



  return (
    <div>
      <CategoryMenuProps categories={categories} />
      <ListSection>
        <SideBarMenu
          subCategories={subCategories}
          catHandler={handleCatSelected}
        />
        <ListProducts />
      </ListSection>
    </div>
  );
};

Product.Layout = MainLayout;

export default Product;

// This function gets called at build time
export async function getStaticPaths() {
  const cat = await fetch(`http://localhost:5000/api/category/all`);
  const categories = await cat.json();

  const paths = categories.map((e) => {
    const idS = e.id.toString();
    return { params: { cid: idS, category: e.name } };
  });

  return {
    paths,
    fallback: false
  };
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(
  //   `http://localhost:5000/api/products/${"electronica"}/${params.id}/`
  // );

  const cat = await fetch(`http://localhost:5000/api/category/all`);
  const categories = await cat.json();
  // const products = await res.json();

  // Pass post data to the page via props
  return { props: { categories } };
}
