import { useContext } from "react";
import axios from "axios";
import Link from "next/link";
import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";
import HomeCarrousel from "../components/HomeCarrousel";

const BannerFullWidth = styled.div`
  height: 50px;
  background-color: ${({ theme }) => theme.colors.orangeYellowCrayola};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  color: ${({ theme }) => theme.colors.charcoal};
`;

const Index = (props) => {
  console.log(props);
  return (
    <>
      <BannerFullWidth>
        Hace tus pedidos por whatsapp, estamos enviando a domicilio
      </BannerFullWidth>
      <HomeCarrousel />
      <h1>
        Latitud Náutica <small>Productos y servicios Náuticos</small>
      </h1>
    </>
  );
};

Index.Layout = MainLayout;

export default Index;
