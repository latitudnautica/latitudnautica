import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const HomeCarrouselStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.details.boxShadow};
  position: relative;
  overflow: hidden;
`;
const ImageWrapper = styled.div`
  position: relative;
`;

const Arrows = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  div {
    margin: auto 0;
  }
`;

const ArrowBase = styled.button`
  padding: 0.3em;
  background-color: #0000005c;
  border: none;
  font-size: 3em;
  color: white;
  outline: none;

  :hover {
    background-color: black;
    font-size: 3.2em;
    font-weight: bold;
  }
`;

const ArrowLeft = styled(ArrowBase)`
  border-radius: 0 5em 5em 0;
  margin-left: -20px;
`;

const ArrowRight = styled(ArrowBase)`
  border-radius: 5em 0 0 5em;
  margin-right: -20px;
`;

const HomeCarrousel = ({ bannersData }) => {
  if (!bannersData) return <div> cargando...</div>;
  const bannerWrapper = useRef();
  const [items, setItems] = useState();
  const [index, setIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(bannersData.length - 1);
  const [direction, setDirection] = useState(true);

  const options = {
    animationPrev: 'fade-in-bck',
    animationNext: 'fade-in-fwd',
    interval: 5000,
    transitionTime: 1,
  };

  const nextImage = () => {
    setDirection(true);
    const isLastSlider = index === lastIndex;
    if (isLastSlider) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    setDirection(false);

    if (index <= 0) {
      setIndex(lastIndex);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const nodes = bannerWrapper.current.childNodes || [];
    setItems(nodes);

    const interval = setInterval(() => {
      nextImage();
    }, options.interval);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const animation = direction ? options.animationNext : options.animationPrev;
    if (items) {
      items.forEach((element) => {
        element.classList.remove('active');
        element.classList.remove(options.animationNext);
        element.classList.remove(options.animationPrev);
      });

      items[index].classList.add('active');
      items[index].classList.add(animation);
    }
  }, [index, items]);

  return (
    <>
      <HomeCarrouselStyled ref={bannerWrapper}>
        {bannersData.map((e, index) => (
          <div className={'bannerItem flip-2-ver-right-1'} key={e.id}>
            <ImageWrapper>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${e.imagePath}`}
                alt={e.title}
                width={1200}
                height={350}
                layout='responsive'
              />
            </ImageWrapper>
          </div>
        ))}
        <Arrows>
          <div>
            <ArrowLeft onClick={prevImage}>
              <BsChevronCompactLeft />
            </ArrowLeft>
          </div>
          <div>
            <ArrowRight onClick={nextImage}>
              <BsChevronCompactRight />
            </ArrowRight>
          </div>
        </Arrows>
      </HomeCarrouselStyled>
    </>
  );
};

HomeCarrousel.propTypes = {
  bannersData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default HomeCarrousel;
