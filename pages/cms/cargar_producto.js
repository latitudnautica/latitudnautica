import withAuth from "../../hoc/withAut";
import CreateItem from "../../components/cms/CreateItem";
import CmsLayout from "../../components/layouts/CmsLayout";

const cargarProducto = ({ loggedIn }) => {

  return (
    <CmsLayout>
      <CreateItem />
    </CmsLayout>
  );
};

export default withAuth(cargarProducto);
