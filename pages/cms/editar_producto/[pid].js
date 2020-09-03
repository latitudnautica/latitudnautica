import { useState } from 'react';
import Error from 'next/error';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useSWR, { trigger } from 'swr';
import CmsLayout from '../../../components/layouts/CmsLayout';
import ProductCard from '../../../components/ProductCard';
import ProductForm from '../../../components/cms/ProductForm';
import UploadFiles from '../../../components/cms/uploadFiles';

const ProductsContainer = styled.main`
  padding: 20px;
  height: 100%;
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: normal;
  }
`;

const ProdSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 15px;
  background-color: white;

  div {
    flex-shrink: 0;
  }
`;
const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: none;
  justify-content: space-evenly;
  padding: 15px;
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
  const Router = useRouter();
  const { pid } = Router.query;

  const { data, error } = useSWR(`product/cms/${pid}?nocache`);

  if (!data) return <div>Cargando</div>;
  if (error) return <div>Error cargando el producto</div>;

  const product = data.data;

  const handleTriggerData = (status) => {
    trigger(`product/cms/${pid}?nocache`);
  };

  return (
    <CmsLayout>
      <ProductsContainer>
        <h2>
          Editando el Producto:
          {' '}
          <b>{product.name}</b>
        </h2>
        <ProdSection>
          <div>
            <h3>
              Categoría:
              {product.Category.name}
            </h3>
            <h3>
              Sub Categoría:
              {product.SubCategory.name}
            </h3>
            <h3>
              Producto Visible:
              {product.visible ? 'visible' : 'oculto'}
            </h3>
          </div>
          <ProductCard item={product} />

          <UploadFiles
            product={product}
            triggerData={handleTriggerData}
          />
        </ProdSection>
        <h2>Editar Info del Producto</h2>
        <InfoSection>
          <ProductForm product={product} isEdit triggerData={handleTriggerData} />
        </InfoSection>
      </ProductsContainer>
    </CmsLayout>
  );
};

export default EditProduct;

// export async function getServerSideProps({ params }) {
//   const pid = params.pid;
//   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/product/cms/${pid}/`;
//   const res = await fetch(apiUrl);
//   const errorCode = res.ok ? false : res.statusCode;
//   const product = await res.json();

//   return {
//     props: { errorCode, product },
//   };
// }
