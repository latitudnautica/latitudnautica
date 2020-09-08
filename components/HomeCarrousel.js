import styled from 'styled-components';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

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

const HomeCarrousel = ({ bannersData }) => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <HomeCarrouselStyled>
      <Slider {...settings}>
        {bannersData.map((e) => (
          <img
            key={e.id}
            src={process.env.NEXT_PUBLIC_API_URL + e.imagePath}
            alt={e.title}
          />
        ))}
      </Slider>
    </HomeCarrouselStyled>
  );
};

HomeCarrousel.propTypes = {
  bannersData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default HomeCarrousel;
