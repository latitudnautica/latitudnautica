import withAuth from "../../hoc/withAut";
// import CreateItem from "../../components/cms/CreateItem";
import ProductForm from "../../components/cms/ProductForm";
import CmsLayout from "../../components/layouts/CmsLayout";

const productInitialData = {
  categoryId: 1,
  subCategoryId: 1
};

const cargarProducto = ({ loggedIn }) => {
  return (
    <CmsLayout>
      <ProductForm product={productInitialData} isEdit={false} />
    </CmsLayout>
  );
};

export default cargarProducto;
