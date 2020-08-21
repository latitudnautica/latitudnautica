import React, { useState, useEffect } from "react";
import Carousel from "@brainhubeu/react-carousel";
import styled from "styled-components";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import useWindowSize from "../hooks/useWindowSize";

const HomeCarrouselStyled = styled.div`
  text-align: center;
  margin-top: 10px;
  padding: 20px 5px;
  /* z-index: 1; */
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.details.boxShadow};

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const SlideArrow = styled.div`
  background: none;
  border: none;
  font-size: 2.8em;

  :hover {
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 0 white;
  }
`;

const ItemCarrousel = styled.img`
  width: 100%;
  z-index: 1;
  /* 
  @media (max-width: 960px) {
    width: 100%;
  } */
`;

const BannerPlaceholder = styled.div`
  height: 250px;
  background: #eee;
`;

const HomeCarrousel = ({ bannersData }) => {
  const windowSize = useWindowSize();
  const [bannerSize, setBannerSize] = useState(windowSize);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const qtyBanners = bannersData.length;
    const handler = () => {
      value >= qtyBanners - 1 ? setValue(0) : setValue(value + 1);
    };
    const autoplay = setInterval(handler, 3000);

    return () => clearInterval(autoplay);
  }, [value]);

  const onChange = (value) => {
    setValue(value);
  };

  console.log("banners length", bannersData.length);
  console.log(value);

  return (
    <HomeCarrouselStyled>
      <Carousel
        value={value}
        onChange={onChange}
        offset={10}
        clickToChange={true}
        infinite={true}
        centered={true}
        numberOfSlides={3}
        arrows={true}
        // autoPlay={true}
        animationSpeed={1000}
        plugins={[
          "autoplay",
          // {
          //   resolve: autoplayPlugin,
          //   options: {
          //     interval: 2000,
          //   },
          // },
        ]}
      >
        {bannersData.map((i) => (
          <ItemCarrousel
            src={process.env.NEXT_PUBLIC_API_URL + i.imagePath}
            key={i.id}
          />
        ))}
      </Carousel>
    </HomeCarrouselStyled>
  );
};

export default HomeCarrousel;
