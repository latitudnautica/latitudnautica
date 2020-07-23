import { useState } from "react";
import { useCategories } from "../context/CategoriesProvider";
import styled from "styled-components";
import Link from "next/link";

const CategoriesNavbarStyled = styled.nav`
  text-align: center;
`;

const NavbarWrapper = styled.div`
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.2em;
  text-transform: uppercase;
  cursor: initial;
`;

const NavbarItem = styled.a`
  margin: 10px;
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  justify-content: center;
  font-size: 1.2em;
  height: 20em;
  text-transform: uppercase;
  position: absolute;
  width: 80vw;
  margin: 0 10vw 0 10vw;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: visibility 0.2s, opacity 0.2s ease;
`;

const DropdownItemsWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
const DropdownItem = styled(NavbarItem)`
  color: green;
`;
const DropdownFooter = styled.div`
  margin: 1em;
`;

const CategoriesNavbar = () => {
  const {
    categories,
    categorySelected,
    categoryHover,
    handleHoverCategory,
    handleClickCategory,
    isLoading
  } = useCategories();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleHover = (e) => {
    const cid = e.target.dataset.cid;

    handleHoverCategory(cid);
    setShowDropdown(true);
  };

  const handleClick = (e) => {
    handleClickCategory(e.target.dataset.cid);
    setShowDropdown(false);
  };

  if (isLoading) return <NavbarWrapper>Cargando Categorías</NavbarWrapper>;

  return (
    <CategoriesNavbarStyled onMouseLeave={() => setShowDropdown(false)}>
      <NavbarWrapper>
        {!isLoading &&
          categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/productos/[category]?cid=${cat.id}`}
              as={`/productos/${cat.name}?cid=${cat.id}`}
              shallow={true}
            >
              <NavbarItem
                onMouseOver={handleHover}
                onClick={handleClick}
                data-cid={cat.id}
              >
                {cat.name}
              </NavbarItem>
            </Link>
          ))}
      </NavbarWrapper>
      {categoryHover && (
        <DropdownWrapper show={showDropdown}>
          <DropdownItemsWrapper>
            {categoryHover.SubCategories.length > 0 ? (
              categoryHover.SubCategories.map((sCat) => (
                <Link
                  href={`/productos/[category]?cid=${categoryHover.id}&scid=${sCat.id}&scname=${sCat.name}`}
                  as={`/productos/${categoryHover.name}?cid=${categoryHover.id}&productos?scid=${sCat.id}&scname=${sCat.name}`}
                >
                  <DropdownItem key={sCat.id}>{sCat.name}</DropdownItem>
                </Link>
              ))
            ) : (
              <p>Sin sub categorías</p>
            )}
          </DropdownItemsWrapper>
          <DropdownFooter>
            <h1>{categoryHover.name}</h1>
          </DropdownFooter>
        </DropdownWrapper>
      )}
    </CategoriesNavbarStyled>
  );
};

export default CategoriesNavbar;
