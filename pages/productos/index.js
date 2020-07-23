import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import GridLoader from "react-spinners/GridLoader";

const CategoriesContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CategoryCard = styled.div`
  margin: 15px;
  width: 250px;
  text-align: center;
  box-shadow: 0px 0px 14px -5px gray;
  transition: 200ms;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 0px 0px gray;
  }
`;
const CardImage = styled.img`
  width: 100%;
`;

const ProductosMain = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/category/all`)
        .then((res) => {
          setCategories(res.data);
          return res.data;
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);
  console.log(categories);
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
            href={`/lista/[category]/[cid]/productos`}
            as={`/lista/${cat.name}/${cat.id}/productos`}
          >
            <CategoryCard key={cat.id}>
              <CardImage
                src={cat.imageUrl ? cat.imageUrl : "/images/logo_test.jpg"}
              />
              <a>{cat.name.toUpperCase()}</a>
            </CategoryCard>
          </Link>
        );
      })}
    </CategoriesContainer>
  );
};

ProductosMain.Layout = MainLayout;

export default ProductosMain;

// export async function getServerSideProps({ params }) {
//   const cat = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/category/all`)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => console.log(err));

//   const categories = cat.data;

//   return { props: { categories } };
// }
