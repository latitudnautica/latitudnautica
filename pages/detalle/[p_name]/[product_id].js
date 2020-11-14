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
import Image from 'next/image';

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
  min-height: 500px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductImage = styled.div`
  flex-basis: 200px;
  flex-shrink: 1;
  margin: 1em 1em;
  position: relative;
  max-width: 300px;
  max-height: 300px;
  min-width: 300px;

  img {
    object-fit: contain;
  }

  @media (max-width: 640px) {
    flex-basis: 300px;
    margin: 1em;
    width: 100%;
    min-width: 100%;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-basis: 700px;
  flex-direction: column;
  flex-shrink: 3;
  margin: 0 2em;
  justify-content: space-between;

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
const Brand = styled.h4`
  font-size: 1.2em;
  margin-top: 5px;
`;
const Price = styled.div`
  font-size: 1.3em;
  font-weight: 400;
  position: relative;
`;
const Currency = styled.span`
  position: relative;
  font-size: 0.7em;
  top: -2px;
`;

const Description = styled.div`
  line-height: 1.4em;
  white-space: pre-line;
`;
const Code = styled.div``;
const Iva = styled.div``;

const Breadcrumbs = styled.div`
  margin-bottom: 5px;
`;

const Producto = ({ errorCode, product, featuredProducts, categories }) => {
  const Router = useRouter();
  if (errorCode) return <Error statusCode={errorCode} />;
  if (product === null)
    return <Error statusCode={404} title='No se encontró el producto' />;

  const image =
    product.imagePath === null
      ? '/images/logo.png'
      : process.env.NEXT_PUBLIC_API_URL + product.imagePath;

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
        <meta property='og:type' content='item' />
        <meta property='og:image' content={image} />
      </Head>
      <CategoriesNavbar _categories={categories} />
      <Container>
        <Breadcrumbs>
          {`${product.Category.name} / ${product.SubCategory.name} / ${product.name}`}
        </Breadcrumbs>
        <ProductStyled>
          <ProductWrapper>
            <ProductImage>
              <Image
                src={image}
                // width={500}
                // height={500}
                layout='fill'
                alt={product.name}
                priority={true}
              />
            </ProductImage>
            <ProductInfo>
              <Title>{product.name}</Title>
              <Brand>{product.brand}</Brand>
              <Price>
                <Currency>{`${
                  product.currency ? product.currency : '$'
                }`}</Currency>
                <span> {`${product.price ? product.price : '-'}`}</span>
              </Price>
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
    brand: PropTypes.string,
    Category: PropTypes.object,
    SubCategory: PropTypes.object,
    price: PropTypes.number,
    description: PropTypes.string,
    codeArticle: PropTypes.string,
    imagePath: PropTypes.string,
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
