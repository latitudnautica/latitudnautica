import { useContext } from "react";
import axios from "axios";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import HomeCarrousel from "../components/HomeCarrousel";

const Index = (props) => {
console.log(props);
  return (
    <>
      <HomeCarrousel />
      <h1>
        Latitud Náutica <small>Productos y servicios Náuticos</small>
      </h1>
    </>
  );
};

Index.Layout = MainLayout;

export default Index;
