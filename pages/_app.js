// /pages/_app.tsx
import Head from "next/head";
import "../styles/styles.css";
import { ThemeProvider } from "styled-components";
import { CategoriesProvider } from "../components/context/CategoriesContext";

const theme = {
  colors: {
    primary: "#4888ca",
    charcoal: "#264653ff",
    persianGreen: "#2a9d8fff",
    orangeYellowCrayola: "#e9c46aff",
    sandyBrown: "#f4a261ff",
    burntSienna: "#e76f51ff"
  }
};

const Noop = ({ children }) => children;

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop;

  return (
    <>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/favicon/favicon-16x16.png'
        />
      </Head>
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
