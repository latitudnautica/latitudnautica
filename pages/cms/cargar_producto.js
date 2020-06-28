import axios from "axios";
import CreateItem from "../../components/cms/CreateItem";
import CmsLayout from "../../layouts/CmsLayout";

export default function cargar_producto(props) {
  const { categories } = props;

  return (
    <CmsLayout>
      <CreateItem categories={categories} />
    </CmsLayout>
  );
}

export async function getServerSideProps(context) {
  // console.log(context);

  const categories = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`
  ).then((res) => res);
  // console.log("cat getServer", categories);

  const data = categories.data;
  return {
    props: { categories: data } // will be passed to the page component as props
  };
}
