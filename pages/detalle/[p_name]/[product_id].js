import Head from "next/head";
import axiosbase from "utils/axiosBase";
import styled from "styled-components";
import MainLayout from "components/layouts/MainLayout";
import Error from "next/error";

const ProductStyled = styled.main``;

const ProductWrapper = styled.div`
  margin: auto;
  display: flex;
  max-width: 1000px;
  border: 1px solid #f0f0f0;
  padding: 1em;
  border-radius: 5px;

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
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
  flex-basis: 700px;
  flex-shrink: 3;
  background: #f0f0f0;
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
  padding: 2em;
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

const Producto = ({ errorCode, product }) => {
  if (errorCode) <Error statusCode={errorCode} />;

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductStyled>
        <ProductWrapper>
          <ProductImage>
            <img
              src={
                product.imagePath
                  ? process.env.NEXT_PUBLIC_API_URL + product.imagePath
                  : "/images/logo_test.jpg"
              }
            />
          </ProductImage>
          <ProductInfo>
            <Title>{product.name}</Title>
            <Brand>{product.brand}</Brand>
            <Price> $ {product.price}</Price>
            <Description>{product.description}</Description>
            <Code>Código: {product.codeArticle}</Code>
            <Iva>{product.tasaIVA}</Iva>
          </ProductInfo>
        </ProductWrapper>
      </ProductStyled>
    </>
  );
};

Producto.Layout = MainLayout;

export default Producto;

export async function getServerSideProps({ params }) {
  const pid = params.product_id;
  const productData = await axiosbase(`/product/detail/${pid}`).then(
    (res) => res
  );
  const errorCode = productData.status === 200 ? false : productData.statusCode;
  const product = productData.data;

  return {
    props: { errorCode, product },
  };
}
