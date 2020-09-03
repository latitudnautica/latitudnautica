import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import onImageError from '@/utils/onImageError';

const FeaturedProductosWrapper = styled.section`
  margin: 2em 0;
  h4 {
    text-align: center;
    margin: 10px;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (featuredProducts) {
      setProducts(featuredProducts);
      setIsLoading(false);
    }
  }, [featuredProducts]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth: false,
    centerMode: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <FeaturedProductosWrapper>
      <h4>Productos Destacados</h4>
      <Slider {...settings}>
        {isLoading
          ? []
          : products.map((i) => (
            <ItemCarrouselWrapper key={i.id}>
              <Link
                href="/detalle/[name]/[id]"
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
