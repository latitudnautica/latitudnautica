import { useRouter } from "next/router";
import CmsLayout from "../../../layouts/CmsLayout";
import styled from "styled-components";
import ProductCard from "../../../components/ProductCard";
import ProductForm from "../../../components/cms/ProductForm";

const ProductsContainer = styled.main`
  padding: 20px;
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: normal;
  }
`;

const ProdDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 15px;
  background-color: white;
`;
const InfoDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 15px;
  background-color: white;
`;


const EditProduct = (props) => {
  console.log(props.product);
  const { product } = props;

  return (
    <ProductsContainer>
      <h2>
        Editando el Producto: <b>{product.name}</b>
      </h2>
      <ProdDetails>
        <ProductCard item={product} />
        <div>
          <h3>Agregar cambios de categoria</h3>
          <h3>Agregar cambios de subCategoria</h3>
          <h3>Agregar estado visible o oculto</h3>
        </div>
      </ProdDetails>
      <h2>Editar Info del Producto</h2>
      <InfoDetails>
        <ProductForm product={product} />
      </InfoDetails>
    </ProductsContainer>
  );
};

EditProduct.Layout = CmsLayout;

export default EditProduct;

export async function getServerSideProps({ params }) {
  const pid = params.pid;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/product/${pid}/`;
  const data = await fetch(apiUrl).then((res) => res.json());
  const product = JSON.parse(JSON.stringify(data));

  // console.log(product);

  return {
    props: { product } // will be passed to the page component as props
  };
}
