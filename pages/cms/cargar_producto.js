import axios from "axios";
import dynamic from "next/dynamic";
import Router from "next/router";
const LoginPage = dynamic(() => import("./login"));
import CreateItem from "../../components/cms/CreateItem";
import CmsLayout from "../../components/layouts/CmsLayout";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function cargaProducto({ loggedIn }) {
  console.log(loggedIn);
  React.useEffect(() => {
    if (loggedIn) return; // do nothing if the user is logged in
  }, [loggedIn]);

  if (!loggedIn) return <LoginPage />;

  return (
    <CmsLayout>
      <CreateItem />
    </CmsLayout>
  );
}

cargaProducto.getInitialProps = async (ctx) => {
  const cookies = ctx.req && cookie.parse(ctx.req.headers.cookie || "");
  console.log("COOKIES FROM getInitialProps>>", cookies);

  // //validar token JWT
  if (
    cookies &&
    Object.keys(cookies).length !== 0 &&
    cookies.constructor === Object
  ) {
  const isValid = await jwt.verify(cookies.token, process.env.NEXT_JWT_KEY);
  console.log(isValid);
  if (isValid) return { loggedIn: true };
  } else {
    return { loggedIn: false };
  }
};
