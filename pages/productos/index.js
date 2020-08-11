import MainLayout from "components/layouts/MainLayout";
import axiosbase from "utils/axiosBase";
import styled from "styled-components";
import Link from "next/link";

const CategoriesContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CategoryCard = styled.a`
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

const ProductosMain = ({ categories }) => {
  if (categories.length == 0)
    return <CategoriesContainer>Cargando..</CategoriesContainer>;

  return (
    <CategoriesContainer>
      {categories.map((cat) => {
        return (
          <Link
            key={cat.id}
            href={`/productos/[category]/[cid]`}
            as={`/productos/${cat.name}/${cat.id}`}
            passHref
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

export async function getStaticProps() {
  const categories = await axiosbase("/category/all").then((res) => res.data);

  return {
    props: { categories },
    revalidate: 3600,
  };
}
