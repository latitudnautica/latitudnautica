import { useRouter } from "next/router";
import styled from "styled-components";
import MainLayout from "../../../../../../layouts/MainLayout";

import CategoryMenuProps from "../../../../../../components/categoryMenuProps";
import SideBarMenu from "../../../../../../components/SideBarMenu";
import ListProducts from "../../../../../../components/ListProducts";

const ListSection = styled.section`
  display: flex;
`;

export default function scid(props) {
  const router = useRouter();
  const { categories } = props;


  // const subCategories = categories[router.query.cid - 1].SubCategories;

  return (
    <div>
      <CategoryMenuProps categories={categories} />
      <ListSection>
        <SideBarMenu subCategories={subCategories} />
        <ListProducts />
      </ListSection>
    </div>
  );
}

scid.Layout = MainLayout;
