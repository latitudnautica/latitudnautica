import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import PropTypes from "prop-types";

const HomeCarrouselStyled = styled.div`
  /* padding: 20px 0px; */
  display: flex;
  max-width: 100vw;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.details.boxShadow};

  display: block;
  position: relative;
  width: 100%;
`;

const CarrouselWrapper = styled.div`
  display: flex;
`;

const HomeCarrousel = ({ bannersData }) => {
  const settings = {
    dots: true,
    infinite: true,
    fade:true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <HomeCarrouselStyled>
      {/* <CarrouselWrapper> */}
      <Slider {...settings}>
        {bannersData.map((e) => {
          return (
            <img
              key={e.id}
              src={process.env.NEXT_PUBLIC_API_URL + e.imagePath}
            ></img>
          );
        })}
      </Slider>
      {/* </CarrouselWrapper> */}
    </HomeCarrouselStyled>
  );
};

HomeCarrousel.propTypes = {
  bannersData: PropTypes.array,
};
export default HomeCarrousel;
