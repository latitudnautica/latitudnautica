import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import AwesomeSlider from "react-awesome-slider";

const HomeCarrouselStyled = styled.div`
  /* padding: 20px 0px; */
  /* max-height: 500px; */
  /* display: flex; */
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.details.boxShadow};

  display: block;
    position: relative;
    width: 100%;

  * {
    --slider-height-percentage: 20%;
    --slider-transition-duration: 600ms;
    --organic-arrow-thickness: 6px;
    --organic-arrow-border-radius: 15px;
    --organic-arrow-height: 40px;
    --organic-arrow-color: #26456f;
    --control-button-width: 15%;
    --control-button-height: 25%;
    --control-button-background: transparent;
    --control-bullet-color: #2d5182;
    --control-bullet-active-color: #26456f;
    --loader-bar-color: #851515;
    --loader-bar-height: 5px;
  }
`;

const CarrouselWrapper = styled.div`
  display: flex;
`;

const HomeCarrousel = ({ bannersData }) => {
  return (
    <HomeCarrouselStyled>
      {/* <CarrouselWrapper> */}
      <AwesomeSlider
        fillParent={false}
        bullets={false}
      >
        {bannersData.map((e) => {
          return (
            <div data-src={process.env.NEXT_PUBLIC_API_URL + e.imagePath}></div>
          );
        })}
      </AwesomeSlider>
      {/* </CarrouselWrapper> */}
    </HomeCarrouselStyled>
  );
};

export default HomeCarrousel;
