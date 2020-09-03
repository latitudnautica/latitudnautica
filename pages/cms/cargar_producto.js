import styled from 'styled-components';
import { PageTitleH1 } from '@/components/layouts/commonStyledComponents';
import ProductForm from '../../components/cms/ProductForm';
import CmsLayout from '../../components/layouts/CmsLayout';

const productInitialData = {
  categoryId: 1,
  subCategoryId: 1,
};

const FormWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

const cargarProducto = ({ loggedIn }) => (
  <CmsLayout>
    <PageTitleH1>Cargar Producto</PageTitleH1>
    <FormWrapper>
      <ProductForm product={productInitialData} isEdit={false} />
    </FormWrapper>
  </CmsLayout>
);

export default cargarProducto;
