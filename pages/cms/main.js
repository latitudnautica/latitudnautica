import CmsLayout from "../../components/layouts/CmsLayout";
import MainContainer from "../../components/cms/MainContainer";
import withAuth from "../../hoc/withAut";


const Main = () => {
  return (
    <div>
      <CmsLayout>
        <MainContainer />
      </CmsLayout>
    </div>
  );
};

export default withAuth(Main);


