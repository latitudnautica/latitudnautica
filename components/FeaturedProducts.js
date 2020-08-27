import { useEffect, useState, useRef, createRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import Slider from "react-slick";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import useWindowSize from "../hooks/useWindowSize";
import PropTypes from "prop-types";

const FeaturedProductosWrapper = styled.section`
  margin: 2em;
  box-shadow: ${({ theme }) => theme.details.boxShadow};
  h4 {
    text-align: center;
    margin: 10px;
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

const ImageItemCarrousel = styled.img`
  width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease-out;
`;

const ItemCarrouselWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  display: flex !important;
  padding: 10px;
  margin: 0 10px;
  max-width: 200px;
  max-height: 200px;
  min-height: 200px;
  cursor: pointer;

  &:hover ${ImageItemCarrousel} {
    transform: scale(1.05);
  }
`;

const ItemPlaceholder = styled.div`
  height: 250px;
  background: #eee;
`;

const FeaturedProducts = ({ featuredProducts }) => {
  const [products, setProducts] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfCards, setNoOfCards] = useState(5);

  const noOfItems = products.length || 5;
  const windowSize = useWindowSize();
  const productosWrapper = createRef();

  useEffect(() => {
    if (featuredProducts) {
      setProducts(featuredProducts);
      setIsLoading(false);
    }
  }, [featuredProducts, activeItemIndex]);

  useEffect(() => {
    if (productosWrapper.current) {
      const parentWidth = productosWrapper.current.offsetWidth;
      const space = parentWidth / 210;
      setNoOfCards(Math.round(space));
    }
  }, [windowSize]);

  const onImageError = (e) => {
    const element = e.target;
    element.src = "/images/logo.png";
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: noOfCards,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <FeaturedProductosWrapper
      className="productosWrapper"
      ref={productosWrapper}
    >
      <h4>Productos Destacados</h4>
      <Slider {...settings}>
        {isLoading
          ? []
          : products.map((i) => (
              <ItemCarrouselWrapper key={i.id}>
                <Link
                  href={`/detalle/[name]/[id]`}
                  as={`/detalle/${i.name}/${i.id}`}
                >
                  <ImageItemCarrousel
                    onError={onImageError}
                    key={i}
                    src={process.env.NEXT_PUBLIC_API_URL + i.imagePath}
                    alt={i.name}
                    title={i.name}
                  />
                </Link>
              </ItemCarrouselWrapper>
            ))}
      </Slider>
    </FeaturedProductosWrapper>
  );
};

FeaturedProducts.propTypes = {
  featuredProducts: PropTypes.array,
};

export default FeaturedProducts;
