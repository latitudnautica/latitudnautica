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
    handleSelectCategory,
    isLoading
  } = useCategories();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleHover = (e) => {
    handleSelectCategory(e.target.dataset.cid);
    setShowDropdown(true);
  };

  if (isLoading) return <NavbarWrapper>Cargando Categorías</NavbarWrapper>;

  return (
    <CategoriesNavbarStyled onMouseLeave={() => setShowDropdown(false)}>
      <NavbarWrapper>
        {!isLoading &&
          categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/lista/[category]/[cid]/productos`}
              as={`/lista/${cat.name}/${cat.id}/productos`}
              replace={true}
            >
              <NavbarItem>
                {cat.name}
                <span onMouseOver={handleHover} data-cid={cat.id}>
                  **
                </span>
              </NavbarItem>
            </Link>
          ))}
      </NavbarWrapper>
      {categorySelected && (
        <DropdownWrapper show={showDropdown}>
          <DropdownItemsWrapper>
            {categorySelected.SubCategories.length > 0 ? (
              categorySelected.SubCategories.map((sCat) => (
                <Link
                  href={`/lista/[category]/[cid]/productos?sc=${sCat.id}&scname=${sCat.name}`}
                  as={`/lista/${categorySelected.name}/${categorySelected.id}/productos?sc=${sCat.id}&scname=${sCat.name}`}
                >
                  <DropdownItem key={sCat.id}>{sCat.name}</DropdownItem>
                </Link>
              ))
            ) : (
              <p>Sin sub categorías</p>
            )}
          </DropdownItemsWrapper>
          <DropdownFooter>
            <h1>{categorySelected.name}</h1>
          </DropdownFooter>
        </DropdownWrapper>
      )}
    </CategoriesNavbarStyled>
  );
};

export default CategoriesNavbar;
