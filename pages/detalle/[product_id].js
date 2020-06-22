import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";

const ProductStyled = styled.main`
  border: 2px solid blue;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-shrink: 1;
`;

const ProductImage = styled.div`
  /* border: 1px solid yellow; */
  width: 75%;
  min-width: 300px;
  max-width: 400px;

  img {
    width: 100%;
  }
`;

const ProductInfo = styled.div`
  border: 1px solid green;
  margin: 20px;
  prod_title,
  price,
  description {
    display: block;
  }

  prod_title {
    font-size: 1.5em;
  }
`;

export default function Producto(props) {
  console.log(props.product);
  const { product } = props;

  return (
    <ProductStyled>
      <ProductWrapper>
        <ProductImage>
          <img src={product.imageUrl} />
        </ProductImage>
        <ProductInfo>
          <div>Id:{product.id}</div>
          <prod_title>{product.name}</prod_title>
          <price> Precio: {product.price}</price>
          <description>{product.description}</description>
          <div>{product.codeArticle}</div>
          <div>{product.tasaIVA}</div>
        </ProductInfo>
      </ProductWrapper>
    </ProductStyled>
  );
}

Producto.Layout = MainLayout;

export async function getServerSideProps({ params }) {
  const pid = params.product_id;
  const apiUrl = `http://localhost:5000/api/products/${pid}/`;
  const data = await fetch(apiUrl).then((res) => res.json());
  const product = JSON.parse(JSON.stringify(data));

  console.log(product);

  return {
    props: { product } // will be passed to the page component as props
  };
}
