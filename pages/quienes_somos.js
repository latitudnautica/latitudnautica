/* eslint-disable import/no-unresolved */
import MainLayout from 'components/layouts/MainLayout';
import styled from 'styled-components';
import axiosBase from 'utils/axiosBase';
import PropTypes from 'prop-types';

import FeaturedProducts from '@/components/FeaturedProducts';
import CategoriesNavbar from '@/components/CategoriesNavbar';
import {
  Container,
  PageTitleH1,
} from '@/components/layouts/commonStyledComponents';
// import Carrousel from "@/components/Carrousel";
import Head from 'next/head';

const AboutWrapper = styled.section`
  margin: 5em 0;
  position: relative;

  :after {
    content: '';
    background: url('images/logo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  margin-top: 1em;
  flex: 1;
  padding: 2em;
  position: relative;

  p {
    line-height: 25px;
    font-size: 1.2em;
    letter-spacing: 1px;
    margin: 1em 0;
  }
  ul {
    line-height: 25px;
    font-size: 1.2em;
    letter-spacing: 1px;
    margin-left: 1em;
  }
`;

const QuienesSomos = ({ categories, featuredProducts }) => (
  <>
    <Head>
      <title>Quienes Somos - Latitud Náutica</title>
    </Head>
    {/* <Carrousel /> */}
    <CategoriesNavbar _categories={categories} />
    <Container>
      <AboutWrapper>
        <PageTitleH1>Quienes Somos</PageTitleH1>
        <ContentWrapper>
          <TextContainer>
            <p>
              Desde el año 2001 somos una Empresa dedicada a la venta y
              fabricación de equipamiento náutico, abarcando todos los
              segmentos, ofreciendo a nuestros clientes todas las soluciones
              acorde a sus requerimientos.
            </p>

            <p>
              La mayor premisa es centralizar todas las tareas necesarias tanto
              en la venta de insumos, reposiciones de los mismos y servicios
              integrales de mantenimiento, tanto en guarderías, clubes o
              astilleros.
            </p>
          </TextContainer>
          <TextContainer>
            <p>
              Contamos con un stock permanente de insumos náuticos nacionales e
              importados de primeras marcas.
            </p>
            <ul>
              <li>Venta de lonas acrílicas Sunbrella, Sauleda y Dixon.</li>
              <li>Venta de motores fuera de borda todas las marcas.</li>
              <li>Venta embarcaciones del astillero BAHAMAS.</li>
              <li>Gestoría naval.</li>
              <li>
                Venta de embarcaciones y asesoramiento por profesionales para
                nuevas adquisiciones.
              </li>
              <li>
                Dealer de GARMIN MARINE Y FUSION MARINE - Venta e instalación de
                toda la gama de equipos.
              </li>
            </ul>
          </TextContainer>
        </ContentWrapper>
      </AboutWrapper>
      <FeaturedProducts featuredProducts={featuredProducts} />
    </Container>
  </>
);

QuienesSomos.Layout = MainLayout;

export default QuienesSomos;

QuienesSomos.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  featuredProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getStaticProps() {
  const featuredProducts = await axiosBase('/product/featured').then(
    (res) => res.data
  );
  const categories = await axiosBase('/category/all').then((res) => res.data);

  return {
    props: {
      categories,
      featuredProducts,
    },
    revalidate: 1,
  };
}
