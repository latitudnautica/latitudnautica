import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import ItemsCarousel from "react-items-carousel";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import useWindowSize from "../hooks/useWindowSize";

const FeaturedProductosWrapper = styled.section`
  margin: 2em;
  box-shadow: ${({ theme }) => theme.details.boxShadow};
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

const ItemCarrouselWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  display: flex;
  padding: 10px;
  max-width: 200px;
  max-height: 200px;
  min-height: 200px;
`;

const ItemCarrousel = styled.img`
  width: 100%;
  object-fit: contain;
`;

const ItemPlaceholder = styled.div`
  height: 250px;
  background: #eee;
`;

const FeaturedProducts = () => {
  const [products, setProducts] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [noOfCards, setNoOfCards] = useState(5);
  const noOfItems = products.length || 5; //value dynamic from items in db
  const autoPlayDelay = 3000;
  const windowSize = useWindowSize();
  const { data, error } = useSWR("/product/featured");

  useEffect(() => {
    if (data) {
      setProducts(data.data);
      setIsDataFetching(false);
      const interval = setInterval(tick, autoPlayDelay);

      return () => {
        clearInterval(interval);
      };
    }
  }, [data, activeItemIndex]);

  useEffect(() => {
    windowSize.width > 1000 ? setNoOfCards(5) : setNoOfCards(2);
  }, [windowSize]);

  const tick = () =>
    setActiveItemIndex((activeItemIndex) => {
      return (activeItemIndex + 1) % (noOfItems - noOfCards + 1);
    });

  if (!data) return <div>Cargando... ... ... ...</div>;
  if (error) {
    console.log(error);
    return <div>error cargando productos</div>;
  }

  const onImageError = (e) => {
    const element = e.target;
    element.src = "/images/logo.png";
  };

  return (
    <FeaturedProductosWrapper>
      <h4>Productos Destacados</h4>
      <ItemsCarousel
        placeholderItem={<ItemPlaceholder />}
        enablePlaceholder={true}
        numberOfPlaceholderItems={5}
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={noOfCards}
        showSlither={false}
        gutter={2}
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
          : products.map((i) => (
              <ItemCarrouselWrapper>
                <ItemCarrousel
                  onError={onImageError}
                  key={i}
                  src={process.env.NEXT_PUBLIC_API_URL + i.imagePath}
                />
              </ItemCarrouselWrapper>
            ))}
      </ItemsCarousel>
    </FeaturedProductosWrapper>
  );
};

export default FeaturedProducts;
