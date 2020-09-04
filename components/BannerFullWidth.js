import styled from 'styled-components';
import PropTypes from 'prop-types';

const BannerFullWidthStyled = styled.div`
  display: flex;
  padding: 10px 0;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  color: ${({ theme }) => theme.colors.price};
  border: 10px solid;
  border-image-slice: 1;
  border-width: 2px;
  border-image-source: ${({ theme }) => theme.colors.background};
  

  @media (max-width: 768px) {
    font-size: 1em;
    text-align: center;
  }

  @media (max-width: 470px) {
    font-size: 0.8em;
  }
`;

const BannerFullWidth = ({ children }) => (
  <BannerFullWidthStyled>{children}</BannerFullWidthStyled>
);

BannerFullWidth.propTypes = {
  children: PropTypes.node.isRequired,
};
export default BannerFullWidth;
