import { useEffect } from "react";
import CmsLayout from "../../components/layouts/CmsLayout";
import MainContainer from "../../components/cms/MainContainer";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import Router from "next/router";
import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("./login"));

const isServer = typeof window === "undefined";

const Main = ({ loggedIn }) => {
  console.log("loggedIn", loggedIn);

  useEffect(() => {
    if (loggedIn) return; // do nothing if the user is logged in
  }, [loggedIn]);
  if (!loggedIn) return <LoginPage />;

  return (
    <div>
      <CmsLayout>
        <MainContainer />
      </CmsLayout>
    </div>
  );
};

export default Main;

Main.getInitialProps = async (ctx) => {
  console.log("isServer", isServer);

  const isValid = async (token) =>
    await jwt.verify(token, process.env.NEXT_JWT_KEY);

  // const validateToken = async () => {
  let token = "";

  if (isServer) {
    const cookies = ctx.req && cookie.parse(ctx.req.headers.cookie || "");

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
  // };
};
