// /pages/_app.tsx
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { SWRConfig } from "swr";
import axiosBase from "../utils/axiosBase";
import { AuthProvider } from "../context/AuthProvider";
import { CategoriesProvider } from "../context/CategoriesProvider";
import { ThemeProvider } from "styled-components";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "../components/AlertTemplate";
import "../styles/styles.css";
import "../styles/nprogress.css";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import { GA_TRACKING_ID } from "../utils/gtag";
const theme = {
  colors: {
    backgroundColor: "#f4a261ff",
    primary: "#4888ca",
    charcoal: "#264653ff",
    persianGreen: "#2a9d8fff",
    orangeYellowCrayola: "#e9c46aff",
    sandyBrown: "#f4a261ff",
    burntSienna: "#e76f51ff"
  }
};
const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 0,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};
const Noop = ({ children }) => children;

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop;

  return (
    <>
      <Head>
        <title>Latitud Náutica</title>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: [
              `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            ]
          }}
        />
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
      <SWRConfig
        value={{
          fetcher: (...args) => axiosBase.get(...args).then((res) => res)
        }}
      >
        <ThemeProvider theme={theme}>
          <CategoriesProvider>
            <AlertProvider template={AlertTemplate} {...options}>
              <AuthProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AuthProvider>
            </AlertProvider>
          </CategoriesProvider>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}
