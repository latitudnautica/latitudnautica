import axiosbase from "utils/axiosBase";
import styled from "styled-components";
import MainLayout from "../../../components/layouts/MainLayout";

const ProductStyled = styled.main``;

const ProductWrapper = styled.div`
  margin: auto;
  display: flex;
  max-width: 1000px;

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
    /* border: 1px solid red; */
    /* object-fit: contain; */
    width: 100%;

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
  margin: 0 20px;
  flex-basis: 700px;
  flex-shrink: 3;

  div {
    margin: 1em;
  }

  @media (max-width: 640px) {
    text-align: center;
  }
`;

const Title = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`;
const Price = styled.div``;
const Description = styled.div``;
const Code = styled.div``;
const Iva = styled.div``;

export default function Producto(props) {
  const { product } = props;

  return (
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
          <Price> $ {product.price}</Price>
          <Description>{product.description}</Description>
          <Code>Código: {product.codeArticle}</Code>
          <Iva>{product.tasaIVA}</Iva>
        </ProductInfo>
      </ProductWrapper>
    </ProductStyled>
  );
}

Producto.Layout = MainLayout;

export async function getServerSideProps({ params }) {
  const pid = params.product_id;
  const product = await axiosbase(`/product/detail/${pid}`).then(
    (res) => res.data
  );

  return {
    props: { product },
  };
}
