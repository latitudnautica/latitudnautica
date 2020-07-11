import CmsLayout from "../../components/layouts/CmsLayout";
import Menu from "../../components/cms/Menu";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import Router from "next/router";
import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("./login"));

const Main = ({ loggedIn }) => {
  React.useEffect(() => {
    if (loggedIn) return; // do nothing if the user is logged in
  }, [loggedIn]);
  if (!loggedIn) return <LoginPage />;

  return (
    <div>
      <CmsLayout>
        <Menu />
      </CmsLayout>
    </div>
  );
};

export default Main;

Main.getInitialProps = async (ctx) => {
  const cookies = (await ctx.req) && cookie.parse(ctx.req.headers.cookie || "");
  console.log("COOKIES FROM getInitialProps>>", cookies);

  //validar token JWT
  if (
    cookies &&
    Object.keys(cookies).length !== 0 &&
    cookies.constructor === Object
  ) {
    const isValid = await jwt.verify(cookies.token, process.env.NEXT_JWT_KEY);
    console.log(isValid);
    if (isValid) return { loggedIn: true, cookies };
  }

  return { loggedIn: false };
};
