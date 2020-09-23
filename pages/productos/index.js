import Link from 'next/link';
import styled from 'styled-components';
import axiosBase from '@/utils/axiosBase';
import FeaturedProducts from '@/components/FeaturedProducts';
import PropTypes from 'prop-types';
import MainLayout from 'components/layouts/MainLayout';

const CategoriesContainer = styled.main`
  display: flex;
  margin-top: 1em;
  justify-content: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.colors.background};
  padding: 3em 0;
`;

const CategoryCard = styled.a`
  /* border: 1px solid red; */
  background-color: #0000001a;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 15px;
  padding: 1em;
  min-width: 150px;
  min-height: 150px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.details.boxShadow};
  transition: 200ms;
  cursor: pointer;
  border-radius: 5px;

  :hover {
    transform: translateY(-10px);
  }

  @media (max-width: 576px) {
    min-width: 100%;
    min-height: 100%;
    margin: 5px;

    :hover {
      transform: translateX(-5px);
    }
  }
`;

const CardContent = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
`;

const ProductosMain = ({ categories, featuredProducts }) => {
  if (categories.length == 0) {
    return <CategoriesContainer>Cargando..</CategoriesContainer>;
  }

  return (
    <>
      <CategoriesContainer>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href='/productos/[category]/[cid]'
            as={`/productos/${cat.name}/${cat.id}`}
            passHref
          >
            <CategoryCard key={cat.id}>
              <CardContent>
                <a>{cat.name.toUpperCase()}</a>
              </CardContent>
            </CategoryCard>
          </Link>
        ))}
      </CategoriesContainer>
      <FeaturedProducts featuredProducts={featuredProducts} />
    </>
  );
};

ProductosMain.Layout = MainLayout;

export default ProductosMain;

ProductosMain.propsTypes = {
  featuredProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getStaticProps() {
  const categories = await axiosBase('/category/all').then((res) => res.data);
  const featuredProducts = await axiosBase('/product/featured').then(
    (res) => res.data
  );

  return {
    props: { categories, featuredProducts },
    revalidate: 10,
  };
}
