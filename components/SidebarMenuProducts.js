import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import useWindowSize from "../hooks/useWindowSize";
import { Button } from "./Button";

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

const SidebarMenuProducts = (props) => {
  const { categorySelected } = props;
  const [showMenu, setShowMenu] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    width >= 769 && setShowMenu(true);
    width <= 768 && setShowMenu(false);
  }, [width]);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const menuAppear = useSpring({
    transform: showMenu ? "translate3D(0,0,0)" : "translate3D(0,-10px,0)",
    opacity: showMenu ? 1 : 0,
  });

  return (
    <SidebarMenuProductsStyled>
      {width <= 768 && (
        <ShowMenuButton onClick={handleShowMenu}>
          {`${showMenu ? "Ocultar" : "Mostrar"} Sub Categorías`}
        </ShowMenuButton>
      )}
      <animated.div style={menuAppear}>
        <ItemsWrapper>
          {showMenu &&
            (categorySelected && categorySelected.SubCategories.length > 0 ? (
              categorySelected.SubCategories.map((sCat) => {
                return (
                  <Link
                    key={sCat.id}
                    scroll={false}
                    href={`/productos/[category]?cid=${categorySelected.id}&scid=${sCat.id}&scname=${sCat.name}`}
                    as={`/productos/${categorySelected.name}?cid=${categorySelected.id}&productos?scid=${sCat.id}&scname=${sCat.name}`}
                    passHref
                  >
                    <ButtonExtended as="a">{sCat.name}</ButtonExtended>
                  </Link>
                );
              })
            ) : (
              <div>No hay sub categorías</div>
            ))}
        </ItemsWrapper>
      </animated.div>
    </SidebarMenuProductsStyled>
  );
};

export default SidebarMenuProducts;
