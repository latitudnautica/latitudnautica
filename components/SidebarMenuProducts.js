/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
// eslint-disable-next-line import/no-unresolved
import useWindowSize from '@/hooks/useWindowSize';
import { Button } from './layouts/Button';

const SidebarMenuProductsStyled = styled.div`
  min-width: 200px;
  /* min-height: 50vh; */
  padding: 10px;
  margin-left: 5px;
  background-color: ${({ theme }) => theme.colors.lightBlack};
  box-shadow: ${({ theme }) => theme.details.boxShadow};
  text-align: center;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.lightBlack};
  }
`;

const ButtonExtended = styled(Button)`
  margin: 2px 0;
  text-transform: capitalize;
`;

const ShowMenuButton = styled(ButtonExtended)`
  padding: 10px 20%;
  border: none;
  :focus,
  :selected,
  :hover {
    border: none;
  }
`;

const SidebarMenuProducts = ({ category }) => {
  const [showMenu, setShowMenu] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    width >= 769 && setShowMenu(true);
    width <= 768 && setShowMenu(false);
  }, [width]);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const menuAppear = useSpring({
    transform: showMenu ? 'translate3D(0,0,0)' : 'translate3D(0,-30px,0)',
    opacity: showMenu ? 1 : 0,
  });

  return (
    <SidebarMenuProductsStyled>
      {width <= 768 && (
        <ShowMenuButton onClick={handleShowMenu}>
          {`${showMenu ? 'Ocultar' : 'Mostrar'} Sub Categorías`}
        </ShowMenuButton>
      )}
      <animated.div style={menuAppear}>
        <ItemsWrapper>
          {category.length === 0
            ? 'Cargando menu'
            : showMenu &&
              (category && category.SubCategories.length > 0 ? (
                category.SubCategories.map((sCat) => (
                  <Link
                    key={sCat.id}
                    scroll={false}
                    href={`/productos/[category]/[cid]?scid=${sCat.id}&scname=${sCat.name}`}
                    as={`/productos/${category.name}/${category.id}?scid=${sCat.id}&scname=${sCat.name}`}
                    shallow={false}
                    passHref
                  >
                    <ButtonExtended as='a'>{sCat.name}</ButtonExtended>
                  </Link>
                ))
              ) : (
                <div>No hay sub categorías</div>
              ))}
        </ItemsWrapper>
      </animated.div>
    </SidebarMenuProductsStyled>
  );
};

SidebarMenuProducts.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    SubCategories: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default SidebarMenuProducts;
