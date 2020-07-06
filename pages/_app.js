// /pages/_app.tsx
import Head from "next/head";
import "../styles/styles.css";
import { ThemeProvider } from "styled-components";
import { CategoriesProvider } from "../components/context/CategoriesContext";

const theme = {
  colors: {
    primary: "#0070f3",
    charcoal: "#264653ff",
    persianGreen: "#2a9d8fff",
    orangeYellowCrayola: "#e9c46aff",
    sandyBrown: "#f4a261ff",
    $burntSienna: "#e76f51ff"
  }
};

const Noop = ({ children }) => children;

export default function MyApp ({ Component, pageProps }) {
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
