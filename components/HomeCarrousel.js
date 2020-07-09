import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import styled from "styled-components";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const HomeCarrouselStyled = styled.div`
  text-align: center;
  margin-top: 10px;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0;
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
`;

export default function HomeCarrousel() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const noOfItems = 6; //dynamic from items in db
  const noOfCards = 2; //how many card on screen
  const autoPlayDelay = 2000;

  useEffect(() => {
    const interval = setInterval(tick, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [activeItemIndex]);

  const tick = () =>
    setActiveItemIndex((activeItemIndex) => {
      return (activeItemIndex + 1) % (noOfItems - noOfCards + 1);
    });

  console.log("activecard", activeItemIndex);

  return (
    <HomeCarrouselStyled>
      <ItemsCarousel
        placeholderItem={<div style={{ height: 200, background: "#EEE" }} />}
        enablePlaceholder={true}
        numberOfPlaceholderItems={3}
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={noOfCards}
        showSlither={false}
        gutter={20}
        leftChevron={
          <SlideArrow>
            <RiArrowLeftSLine />
          </SlideArrow>
        }
        rightChevron={
          <SlideArrow>
            <RiArrowRightSLine />
          </SlideArrow>
        }
        outsideChevron={false}
        // chevronWidth={chevronWidth}
      >
        <ItemCarrousel src='/images/carrousel/banner_productos_destacados.jpg' />
        <ItemCarrousel src='/images/carrousel/banner2_ES.jpg' />
        <ItemCarrousel src='/images/carrousel/banner4_ES.jpg' />
        <ItemCarrousel src='/images/carrousel/banner5_ES.jpg' />
        <ItemCarrousel src='/images/carrousel/banner7_ES.jpg' />
        <ItemCarrousel src='/images/carrousel/banner8_ES.jpg' />
      </ItemsCarousel>
    </HomeCarrouselStyled>
  );
}
