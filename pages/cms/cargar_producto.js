import { useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("./login"));
import CreateItem from "../../components/cms/CreateItem";
import CmsLayout from "../../components/layouts/CmsLayout";
import cookie from "cookie";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const isServer = typeof window === "undefined";
console.log("isServer", isServer);

const cargarProducto = ({ loggedIn }) => {
  console.log("loggedIn;", loggedIn);
  useEffect(() => {
    if (loggedIn) return; // do nothing if the user is logged in
  }, [loggedIn]);

  if (!loggedIn) return <LoginPage />;

  return (
    <CmsLayout>
      <CreateItem />
    </CmsLayout>
  );
};

export default cargarProducto;

cargarProducto.getInitialProps = async (ctx) => {
  console.log("isServer", isServer);

  const isValid = async (token, key) => await jwt.verify(token, key);

  let token = "";

  if (isServer) {
    const cookies = ctx.req && cookie.parse(ctx.req.headers.cookie || "");
    const key = process.env.NEXT_JWT_KEY;

    if (Object.keys(cookies).length !== 0 && cookies.constructor === Object) {
      token = cookies.token;
      console.log("token server:", token);

      if (isValid(token)) return { loggedIn: true };
    }
    return { loggedIn: false };
  } else {
    const handleRouteChange = (url) => {
      console.log("App is changing to: ", url);
      Router.reload();
    };

    Router.events.on("routeChangeComplete", handleRouteChange);
    return { loggedIn: false };
  }
};
