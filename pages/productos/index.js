import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import GridLoader from "react-spinners/GridLoader";
import { useCategories } from "../../context/CategoriesProvider";

const CategoriesContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 15px;
  max-width: 200px;
  max-height: 200px;
  text-align: center;
  box-shadow: 0px 0px 14px -5px gray;
  transition: 200ms;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 0px 0px gray;
  }
`;
const CardImage = styled.img`
  /* max-height: 150px;
  max-width: 150px; */
  width: 100%;
`;
const CardContent = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
`;

const ProductosMain = (props) => {
  const { categories } = useCategories();

  if (categories.length == 0)
    return (
      <CategoriesContainer>
        <GridLoader />
      </CategoriesContainer>
    );

  return (
    <CategoriesContainer>
      {categories.map((cat) => {
        return (
          <Link
            key={cat.id}
            href={`/productos/[category]?cid=${cat.id}`}
            as={`/productos/${cat.name}?cid=${cat.id}`}
          >
            <CategoryCard key={cat.id}>
              <CardImage
                src={
                  cat.imageUrl
                    ? process.env.NEXT_PUBLIC_API_URL + cat.imageUrl
                    : "/images/logo_test.jpg"
                }
              />
              <CardContent>
                <a>{cat.name.toUpperCase()}</a>
              </CardContent>
            </CategoryCard>
          </Link>
        );
      })}
    </CategoriesContainer>
  );
};

ProductosMain.Layout = MainLayout;

export default ProductosMain;