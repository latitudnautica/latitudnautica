import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axiosBase from 'utils/axiosBase';
import styled from 'styled-components';
import MainLayout from 'components/layouts/MainLayout';
import Error from 'next/error';
import FeaturedProduct from '@/components/FeaturedProducts';
import CategoriesNavbar from '@/components/CategoriesNavbar';
import {
  Container,
  Divisor,
  Button,
} from '@/components/layouts/commonStyledComponents';

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

  div {
    margin: 5px 0;
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
const Brand = styled.h3`
  margin-top: 5px;
`;
const Price = styled.h2`
  color: ${({ theme }) => theme.colors.price};
  margin: 0px 0 20px 0;
`;
const Description = styled.div``;
const Code = styled.div``;
const Iva = styled.div``;

const Breadcrumbs = styled.div``;

const Producto = ({
  errorCode, product, featuredProducts, categories,
}) => {
  if (errorCode) <Error statusCode={errorCode} />;
  const Router = useRouter();

  return (
    <>
      <Head>
        <title>{product.name}</title>
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
              />
            </ProductImage>
            <ProductInfo>
              <Title>{product.name}</Title>
              <Brand>{product.brand}</Brand>
              <Price>
                {' '}
                $
                {product.price}
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

export default Producto;

export async function getServerSideProps({ params }) {
  const pid = params.product_id;
  const productData = await axiosBase(`/product/detail/${pid}`).then(
    (res) => res,
  );
  const featuredProducts = await axiosBase('/product/featured').then(
    (res) => res.data,
  );
  const categories = await axiosBase('/category/all').then((res) => res.data);
  const errorCode = productData.status === 200 ? false : productData.statusCode;
  const product = productData.data;

  return {
    props: {
      errorCode, product, featuredProducts, categories,
    },
    // fallback: true,
  };
}
