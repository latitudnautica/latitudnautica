import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import styled from "styled-components";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import useSWR from "swr";
import useWindowSize from "../hooks/useWindowSize";

const HomeCarrouselStyled = styled.div`
  text-align: center;
  margin-top: 10px;
  padding: 20px 5px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.details.boxShadow};

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
  z-index: 1;
`;
const BannerPlaceholder = styled.div`
  height: 250px;
  background: #eee;
`;

export default function HomeCarrousel() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [images, setImages] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [noOfCards, setNoOfCards] = useState(1);
  const noOfItems = images.length || 1; //value dynamic from items in db
  const autoPlayDelay = 0;
  const windowSize = useWindowSize();
  const { data, error } = useSWR("/utils/banners");
  error && console.log(error);

  useEffect(() => {
    if (data) {
      setImages(data.data);
      setIsDataFetching(false);
      const interval = setInterval(tick, autoPlayDelay);

      return () => {
        clearInterval(interval);
      };
    }
  }, [data, activeItemIndex]);

  useEffect(() => {
    windowSize.width > 1000 ? setNoOfCards(2) : setNoOfCards(1);
  }, [windowSize]);

  const tick = () =>
    setActiveItemIndex((activeItemIndex) => {
      return (activeItemIndex + 1) % (noOfItems - noOfCards + 1);
    });
  const pauseCarrousel = () => {
    console.log("pause", activeItemIndex);
  };
  return (
    <HomeCarrouselStyled onMouseOver={pauseCarrousel}>
      <ItemsCarousel
        placeholderItem={<BannerPlaceholder />}
        enablePlaceholder={true}
        numberOfPlaceholderItems={1}
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={noOfCards}
        showSlither={false}
        gutter={10}
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
        {isDataFetching
          ? []
          : images.map((i) => (
              <ItemCarrousel
                key={i}
                src={process.env.NEXT_PUBLIC_API_URL + i.imagePath}
              />
            ))}
      </ItemsCarousel>
    </HomeCarrouselStyled>
  );
}
