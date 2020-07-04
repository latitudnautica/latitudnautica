import Error from "next/error";
import styled from "styled-components";
import CmsLayout from "../../../layouts/CmsLayout";
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
const Select = styled.select`
  border: none;
  height: 35px;
  width: 200px;
  margin: 0 0 0 25px;
  padding: 0 15px;
  font-size: 1.1em;

  option {
    margin: 5px 0;
  }
`;

const EditProduct = (props) => {
  console.log("EditProduct props", props);
  const { product, errorCode } = props;
  if (errorCode || product === null) {
    return (
      <Error
        statusCode={errorCode}
        title='No se encuentra el producto seleccionado'
      />
    );
  }

  const handleChangeProductVisibility = (value) => {};

  return (
    <ProductsContainer>
      <h2>
        Editando el Producto: <b>{product.name}</b>
      </h2>
      <ProdDetails>
        <ProductCard item={product} />
        <div>
          <h3>Categoría: {product.Category.name}</h3>
          <h3>Sub Categoría: {product.SubCategory.name}</h3>
          <h3>Producto Visible: {product.visible ? "visible" : "oculto"}</h3>
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
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/product/cms/${pid}/`;
  const res = await fetch(apiUrl);
  const errorCode = res.ok ? false : res.statusCode;
  const product = await res.json();

  return {
    props: { errorCode, product } // will be passed to the page component as props
  };
}
