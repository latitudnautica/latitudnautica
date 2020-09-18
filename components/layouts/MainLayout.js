import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactGA from 'react-ga';
import { GA_TRACKING_ID } from '@/utils/gtag';

const Container = styled.main`
  position: relative;
  min-height: 80vh;
  margin: auto 0px;
`;

export default function MainLayout({ children }) {
  const Router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize(GA_TRACKING_ID);
      window.GA_INITIALIZED = true;
    }
    
    ReactGA.set({ page: Router.asPath });
    ReactGA.pageview(Router.asPath);
  });

  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer>FOOTER</Footer>
    </>
  );
}
