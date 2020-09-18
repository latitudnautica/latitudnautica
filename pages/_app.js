/* eslint-disable import/no-unresolved */
import Head from 'next/head';
import Router, {useRouter} from 'next/router';
import NProgress from 'nprogress';
import { SWRConfig } from 'swr';
import axiosBase from '@/utils/axiosBase';
import { AuthProvider } from '@/context/AuthProvider';
import { CategoriesProvider } from '@/context/CategoriesProvider';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import theme from '../styles/theme';
import '../styles/styles.css';
import '../styles/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import ReactGA from 'react-ga';
import { GA_TRACKING_ID } from '../utils/gtag';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Noop = ({ children }) => children;

export default function MyApp({ Component, pageProps }) {
  const Router = useRouter()
  console.log(Router);
  const Layout = Component.Layout || Noop;
  ReactGA.initialize(GA_TRACKING_ID);
  ReactGA.pageview(Router.asPath);

  return (
    <>
      <Head>
        <title>
          Latitud Náutica - Venta y Fabricación de Equipamiento Náutico{' '}
        </title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='Description'
          content='Desde el año 2001 somos una Empresa dedicada a la venta y fabricación de equipamiento náutico, abarcando todos los segmentos, ofreciendo a nuestros clientes todas las soluciones acorde a sus requerimientos.
          La mayor premisa es centralizar todas las tareas necesarias tanto en la venta de insumos, reposiciones de los mismos y servicios integrales de mantenimiento, tanto en guarderías, clubes o astilleros.'
        ></meta>
        <meta name='robots' content='all' />
        {/* Global Site Tag (gtag.js) - Google Analytics
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: [
              `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            ],
          }}
        /> */}
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
        <link rel='manifest' href='/site.webmanifest' />
        <link
          rel='stylesheet'
          type='text/css'
          charSet='UTF-8'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
      </Head>
      <SWRConfig
        value={{
          fetcher: (...args) => axiosBase.get(...args).then((res) => res),
        }}
      >
        <ThemeProvider theme={theme}>
          <CategoriesProvider>
            <AuthProvider>
              <Layout>
                <ToastContainer />
                <Component {...pageProps} />
              </Layout>
            </AuthProvider>
          </CategoriesProvider>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}
