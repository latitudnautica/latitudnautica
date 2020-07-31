import { useState } from "react";
import { useCategories } from "../context/CategoriesProvider";
import styled from "styled-components";
import Link from "next/link";

const CategoriesNavbarStyled = styled.nav`
  text-align: center;
  position: inherit;
  box-shadow: ${({ theme }) => theme.details.boxShadow};
  margin: 16px 0;
  z-index: 99;
`;

const NavbarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-transform: uppercase;
  cursor: initial;
  position: relative;
  background: whiteSmoke;
  z-index: 99;
`;

const NavbarItem = styled.a`
  cursor: pointer;
  padding: 5px;
  transition: all 0.2s;
  font-size: 1.1em;
  box-sizing: border-box;
  /* border: 1px solid gray; */
  margin: 5px 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0);
  border-bottom: ${(props) => `3px solid ${props.borderColor}`};

  :hover {
    font-weight: bold;
    border-bottom: 3px solid yellow;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #fff;
  box-shadow: 0 1px 1px #eee;
  /* justify-content: center; */
  height: 15em;
  text-transform: uppercase;
  position: absolute;
  width: 100vw;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: visibility 0.2s, opacity 0.2s ease;
  box-shadow: ${({ theme }) => theme.details.boxShadowBottom};
  z-index: 99;
`;

const DropdownItemsWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  z-index: 1;
`;

const DropdownItem = styled(NavbarItem)`
  font-size: 1.1em;
  color: green;
`;

const DropdownFooter = styled.div`
  color: gray;
  margin: 1.2em;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(130, 130, 130, 0.2);
  /* z-index: 1; */
`;

const CategoriesNavbar = () => {
  const {
    categories,
    categoryHover,
    handleHoverCategory,
    handleClickCategory,
    categorySelected,
    isLoading
  } = useCategories();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleHover = (e) => {
    const cid = e.target.dataset.cid;
    handleHoverCategory(cid);
    setShowDropdown(true);
  };

  const handleClick = (e) => {
    const cid = e.target.dataset.cid;
    handleClickCategory(cid);
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
                borderColor={
                  categorySelected && cat.id == categorySelected.id
                    ? "red"
                    : "transparent"
                }
              >
                {cat.name}
              </NavbarItem>
            </Link>
          ))}
      </NavbarWrapper>
      {categoryHover && (
        <DropdownWrapper
          show={showDropdown}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <DropdownItemsWrapper>
            {categoryHover.SubCategories.length > 0 ? (
              categoryHover.SubCategories.map((sCat) => (
                <Link
                  key={sCat.id}
                  href={`/productos/[category]?cid=${categoryHover.id}&scid=${sCat.id}&scname=${sCat.name}`}
                  as={`/productos/${categoryHover.name}?cid=${categoryHover.id}&productos?scid=${sCat.id}&scname=${sCat.name}`}
                >
                  <DropdownItem onClick={() => setShowDropdown(false)}>
                    {sCat.name}
                  </DropdownItem>
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
      {showDropdown && <Overlay onClick={() => setShowDropdown(false)} />}
    </CategoriesNavbarStyled>
  );
};

export default CategoriesNavbar;
