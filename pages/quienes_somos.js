import MainLayout from "components/layouts/MainLayout";
import styled from "styled-components";
import axiosBase from "utils/axiosBase";

import FeaturedProducts from "components/FeaturedProducts";
import CategoriesNavbar from "@/components/CategoriesNavbar";
import {
  Container,
  PageTitleH1,
} from "components/layouts/commonStyledComponents";
// import Carrousel from "@/components/Carrousel";
import Head from "next/head";

const AboutWrapper = styled.section`
  margin: 5em 0;
  position: relative;

  :after {
    content: "";
    background: url("images/logo.png");
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
const TextContainer = styled.div`
  margin-top: 1em;
  padding: 2em;
  position: relative;

  p {
    line-height: 25px;
    font-size: 1.2em;
    letter-spacing: 1px;
  }
`;

const QuienesSomos = ({ categories, featuredProducts }) => {
  return (
    <>
      <Head>
        <title>Quienes Somos - Latitud Náutica</title>
      </Head>
      {/* <Carrousel /> */}
      <CategoriesNavbar _categories={categories} />
      <Container>
        <AboutWrapper>
          <PageTitleH1>Quienes Somos</PageTitleH1>
          <TextContainer>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ligula mi, aliquet in cursus in, pretium non nisl. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Vestibulum id ornare
              leo. Vestibulum porttitor sodales tellus in malesuada. Nunc eu
              massa vel massa sagittis efficitur eleifend sit amet nisi.
              Maecenas velit turpis, commodo eget imperdiet at, tempus molestie
              libero. Mauris ac orci eu lorem tempor tincidunt. Fusce vulputate
              vehicula ligula, eget hendrerit lorem auctor vitae. Integer
              auctor, nunc sed consectetur molestie, augue tortor vehicula nunc,
              quis euismod nisl orci a ex. Vestibulum accumsan nunc ut erat
              sagittis pharetra. Vivamus porta, ligula eu consequat vestibulum,
              neque sapien fermentum nunc, ac mattis justo nisi sed ex. Nunc
              dictum malesuada est et imperdiet.
            </p>
            <p>
              Morbi ac diam in massa eleifend tincidunt in id eros. Integer
              efficitur, est non efficitur fermentum, dolor tortor elementum
              nibh, id condimentum eros urna sit amet neque. Aliquam fermentum
              augue lectus, id varius ligula tempor id. Aenean venenatis
              suscipit fermentum. Proin sed lorem a augue lobortis lacinia sit
              amet at augue. Cras mauris mi, cursus vel aliquam sit amet,
              facilisis quis enim. Aliquam efficitur lectus ac sapien porta,
              placerat tincidunt sem tempor. Vivamus risus ipsum, sollicitudin a
              lacus id, lobortis pharetra dolor.
            </p>
          </TextContainer>
        </AboutWrapper>
        <FeaturedProducts featuredProducts={featuredProducts} />
      </Container>
    </>
  );
};

QuienesSomos.Layout = MainLayout;

export default QuienesSomos;

export async function getStaticProps() {
  const featuredProducts = await axiosBase("/product/featured").then(
    (res) => res.data
  );
  const categories = await axiosBase("/category/all").then((res) => res.data);

  return {
    props: {
      categories,
      featuredProducts,
    },
    revalidate: 1,
  };
}
