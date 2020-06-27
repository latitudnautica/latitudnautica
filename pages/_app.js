// /pages/_app.tsx
import App, { AppProps, AppContext } from "next/app";
import Head from "next/head";
import "../styles/styles.css";
import { ThemeProvider } from "styled-components";
import { CategoriesProvider } from "../components/context/CategoriesContext";
import axios from "axios";
const theme = {
  colors: {
    primary: "#0070f3"
  }
};

const Noop = ({ children }) => children;

export default function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout || Noop;
  return (
    <>
      <Head></Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <CategoriesProvider>
            <Component {...pageProps} />
          </CategoriesProvider>
        </Layout>
      </ThemeProvider>
    </>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const getCategories = await axios(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`
//   )
//     .then((res) => res)
//     .then((data) => data);

//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };
