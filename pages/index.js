import styled from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import HomeCarrousel from "../components/Carrousel";
import FeaturedProducts from "components/FeaturedProducts";
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

const Index = () => {
  return (
    <>
      <BannerFullWidth>Hace tus consultas por WhatsApp</BannerFullWidth>
      <HomeCarrousel />
      <section>
        <h1>
          Latitud Náutica <small>Productos y servicios Náuticos</small>
        </h1>
      </section>

      <FeaturedProducts />
      <FeaturedProducts />
      <FeaturedProducts />
      <FeaturedProducts />
    </>
  );
};

Index.Layout = MainLayout;

export default Index;
