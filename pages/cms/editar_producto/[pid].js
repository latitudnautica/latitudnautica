import { useState } from "react";
import Error from "next/error";
import styled from "styled-components";
import CmsLayout from "../../../components/layouts/CmsLayout";
import ProductCard from "../../../components/ProductCard";
import ProductForm from "../../../components/cms/ProductForm";
import UploadFiles from "../../../components/cms/uploadFiles";
import withAuth from "../../../hoc/withAut";
import Button from "../../../components/Button";

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
const ImageDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-space-around;
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
  // console.log("EditProduct props", props);
  const [showImageModal, setShowImageModal] = useState(false);

  const { product, errorCode } = props;

  if (errorCode || product === null) {
    return (
      <Error
        statusCode={errorCode}
        title='No se encuentra el producto seleccionado'
      />
    );
  }

  const handleChangeImage = (value) => {
    setShowImageModal(true);
  };

  return (
    <CmsLayout>
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
            <div>
              <Button handleClick={handleChangeImage}>Cambiar Imagen</Button>
            </div>
          </div>
        </ProdDetails>
        <h2>Editar Info del Producto</h2>
        <InfoDetails>
          <ProductForm product={product} isEdit />
        </InfoDetails>
        <ImageDetail>
          <img
            src={product.imageUrl ? product.imageUrl : "/images/logo_test.jpg"}
          />
          <UploadFiles prodId={product.id} />
        </ImageDetail>
      </ProductsContainer>
    </CmsLayout>
  );
};

EditProduct.Layout = CmsLayout;

export default withAuth(EditProduct);

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
