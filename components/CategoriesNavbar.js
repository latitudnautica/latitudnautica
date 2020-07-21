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
  justify-content: center;
  font-size: 1.2em;
  text-transform: uppercase;

  a {
    margin: 10px;
    :hover {
      font-weight: bold;
    }
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  justify-content: center;
  font-size: 1.2em;
  height: 20em;
  text-transform: uppercase;
  position: absolute;
  width: 80vw;
  margin: 0 10vw 0 10vw;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 0.2s, opacity 0.2s ease;
`;

const DropdownItem = styled.div`
  margin: 1em;
`;

const CategoriesNavbar = () => {
  const {
    categories,
    subCategories,
    populateSubCategories,
    isLoading
  } = useCategories();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleHover = (e) => {
    populateSubCategories(e.target.dataset.cid);
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
            >
              <a onMouseOver={handleHover} data-cid={cat.id}>
                {cat.name}
              </a>
            </Link>
          ))}
      </NavbarWrapper>
      {subCategories && (
        <DropdownWrapper show={showDropdown}>
          {subCategories.length > 0 ? (
            subCategories.map((sCat) => (
              <DropdownItem key={sCat.id}>{sCat.name}</DropdownItem>
            ))
          ) : (
            <p>sin subcategories</p>
          )}
        </DropdownWrapper>
      )}
    </CategoriesNavbarStyled>
  );
};

export default CategoriesNavbar;
