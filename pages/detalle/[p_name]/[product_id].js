/* eslint-disable import/no-unresolved */
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axiosBase from 'utils/axiosBase';
import styled from 'styled-components';
import MainLayout from 'components/layouts/MainLayout';
import Error from 'next/error';
import FeaturedProduct from '@/components/FeaturedProducts';
import CategoriesNavbar from '@/components/CategoriesNavbar';
import { Container, Button } from '@/components/layouts/commonStyledComponents';
import PropTypes from 'prop-types';

const ProductStyled = styled.main``;

const ProductWrapper = styled.div`
  margin: auto;
  display: flex;
  border: 1px solid #f0f0f0;
  padding: 1em;

  border: 5px solid;
  border-image-slice: 1;
  border-width: 3px;
  border-radius: 5px;
  border-image-source: ${({ theme }) => theme.border.gradient};

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.div`
  text-align: center;
  margin: 1em 0;
  flex-basis: 300px;
  flex-shrink: 1;

  img {
    object-fit: contain;
    width: 100%;
    max-height: 300px;

    @media (max-width: 640px) {
      margin: 0;
      border-right: none;
      width: 40%;
    }
  }

  @media (max-width: 640px) {
    margin: 0;
    flex-basis: 100px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 700px;
  flex-shrink: 3;
  margin: 0 2em;

  div {
    margin: 1em 0;
  }
  @media (max-width: 640px) {
    text-align: center;
    flex-basis: auto;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0px;
`;
const Brand = styled.h2`
  font-size: 1.4em;

  margin-top: 5px;
`;
const Price = styled.h3`
  color: ${({ theme }) => theme.colors.price};
  margin: 10px 0 20px 0;
`;
const Description = styled.div`
  line-height: 1.4em;
`;
const Code = styled.div``;
const Iva = styled.div``;

const Breadcrumbs = styled.div`
  margin-bottom: 5px;
`;

const Producto = ({ errorCode, product, featuredProducts, categories }) => {
  if (errorCode) <Error statusCode={errorCode} />;
  const Router = useRouter();

  return (
    <>
      <Head>
        <title>Latitud Náutica - {product.name}</title>
        <meta
          property='og:title'
          content={`Latitud Náutica - ${product.name}`}
        />
        <meta property='og:site_name' content='Latitud Náutica' />
        <meta
          property='og:url'
          content={`https://www.latitudnautica.com.ar/detalle/${
            product && product.name
          }/${product && product.id}`}
        />
        <meta property='og:description' content={`${product.description}`} />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content='https://www.latitudnautica.com.ar/images/logo_full.png'
        />
      </Head>
      <CategoriesNavbar _categories={categories} />
      <Container>
        <Breadcrumbs>
          {`${product.Category.name} / ${product.SubCategory.name} / ${product.name}`}
        </Breadcrumbs>
        <ProductStyled>
          <ProductWrapper>
            <ProductImage>
              <img
                src={
                  product.imagePath
                    ? process.env.NEXT_PUBLIC_API_URL + product.imagePath
                    : '/images/logo_test.jpg'
                }
                alt={product.name}
              />
            </ProductImage>
            <ProductInfo>
              <Title>{product.name}</Title>
              <Brand>{product.brand}</Brand>
              <Price> ${product.price}</Price>
              <Description>{product.description}</Description>
              <Code>
                Código:
                {product.codeArticle}
              </Code>
              <Iva>{product.tasaIVA}</Iva>
              <Link
                href={`/contacto?product=${
                  product.name
                }&link=${`https://www.latitudnautica.com.ar${Router.asPath}`}`}
                as={`/contacto?product=${
                  product.name
                }&link=${`https://www.latitudnautica.com.ar${Router.asPath}`}`}
              >
                <Button> Consultanos por este producto</Button>
              </Link>
            </ProductInfo>
          </ProductWrapper>
          {/* <Divisor /> */}
        </ProductStyled>
      </Container>
      <FeaturedProduct featuredProducts={featuredProducts} />
    </>
  );
};

Producto.Layout = MainLayout;
Producto.propTypes = {
  errorCode: PropTypes.bool.isRequired,
  product: PropTypes.PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    Category: PropTypes.number,
    SubCategory: PropTypes.number,
    price: PropTypes.number,
    description: PropTypes.number,
    codeArticle: PropTypes.number,
    imagePath: PropTypes.number,
    tasaIVA: PropTypes.number,
  }).isRequired,
  featuredProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Producto;

export async function getServerSideProps({ params }) {
  const pid = params.product_id;
  const productData = await axiosBase(`/product/detail/${pid}`).then(
    (res) => res
  );
  const featuredProducts = await axiosBase('/product/featured').then(
    (res) => res.data
  );
  const categories = await axiosBase('/category/all').then((res) => res.data);
  const errorCode = productData.status === 200 ? false : productData.statusCode;
  const product = productData.data;

  return {
    props: {
      errorCode,
      product,
      featuredProducts,
      categories,
    },
  };
}
