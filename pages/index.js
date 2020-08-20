import styled from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import HomeCarrousel from "../components/Carrousel";
import FeaturedProducts from "components/FeaturedProducts";
import axiosBase from "@/utils/axiosBase";

const BannerFullWidth = styled.div`
  background-color: ${({ theme }) => theme.colors.orangeYellowCrayola};
  display: flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  color: ${({ theme }) => theme.colors.charcoal};

  @media (max-width: 768px) {
    font-size: 1em;
    text-align: center;
  }

  @media (max-width: 470px) {
    font-size: 0.8em;
  }
`;
const Title = styled.section`
  text-align: center;
  margin: 1em 0;
`;

const Index = ({ featuredProducts, banners }) => {
  return (
    <>
      <BannerFullWidth>Hace tus consultas por WhatsApp</BannerFullWidth>
      <HomeCarrousel bannersData={banners} />
      <Title>
        <h1>
          Latitud Náutica <small>Productos y Servicios Náuticos</small>
        </h1>
      </Title>

      <FeaturedProducts featuredProducts={featuredProducts} />
    </>
  );
};

Index.Layout = MainLayout;

export default Index;

export async function getStaticProps() {
  const featuredProducts = await axiosBase("/product/featured").then(
    (res) => res.data
  );
  const banners = await axiosBase("/utils/banners").then((res) => res.data);

  return {
    props: {
      featuredProducts,
      banners,
    },
    revalidate: 300,
  };
}
