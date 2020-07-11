import { useState } from "react";
import MainLayout from "../../../../components/layouts/MainLayout";
import { useRouter } from "next/router";
import CategoryMenuProps from "../../../../components/categoryMenuProps";
// import SideBarMenu from "../../../../components/SideBarMenu";
import SideBarMenuClient from "../../../../components/SideBarMenuClient";
import styled from "styled-components";
import ListProducts from "../../../../components/ListProducts";
import axios from "axios";

const ListSection = styled.section`
  display: flex;
`;

const Product = (props) => {
  const router = useRouter();
  const { categories } = props;
  const subCategories = categories.find((cat) => cat.id == router.query.cid)
    .SubCategories;
  const [catSelected, setCatSelected] = useState(0);

  const handleCatSelected = (e) => {
    const id = e.target.dataset.cid;
    setCatSelected(id);
  };

  return (
    <div>
      <CategoryMenuProps categories={categories} />
      <ListSection>
        <SideBarMenuClient
          subCategories={subCategories}
          catHandler={handleCatSelected}
        />
        <ListProducts catSelected={catSelected} />
      </ListSection>
    </div>
  );
};

Product.Layout = MainLayout;

export default Product;

export async function getServerSideProps({ params }) {
  // console.log(params);

  const cat = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/category/all`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  const categories = cat.data;

  return { props: { categories } };
}
