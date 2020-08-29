import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

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
  background: ${({ theme }) => theme.colors.background};
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
  background-color: ${({ theme }) => theme.colors.lightBlack};
  box-shadow: 0 1px 1px #eee;
  /* justify-content: center; */
  height: 4em;
  text-transform: uppercase;
  position: absolute;
  width: 80%;
  left: 10%;
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
  height: 3em;
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

const CategoriesNavbar = ({ _categories }) => {
  const [categories, setCategories] = useState(_categories || []);
  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryHover, setCategoryHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    if (_categories) {
      setCategories(_categories);
    }
  }, [_categories]);

  useEffect(() => {
    const category = categories.find((cat) => cat.id == Router.query.cid);
    setCategorySelected(category);
  });

  const handleClickCategory = (cid) => {
    const category = categories.find((cat) => cat.id == cid);
    setCategorySelected(category);
  };

  const handleHoverCategory = (cid) => {
    const category = categories.find((cat) => cat.id == cid);
    setCategoryHover(category);
  };

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

  return (
    <CategoriesNavbarStyled onMouseLeave={() => setShowDropdown(false)}>
      <NavbarWrapper>
        {!isLoading &&
          categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/productos/[category]/[cid]`}
              as={`/productos/${cat.name}/${cat.id}`}
              passHref
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
                  href={`/productos/[category]/[cid]?scid=${sCat.id}&scname=${sCat.name}`}
                  as={`/productos/${categoryHover.name}/${categoryHover.id}?scid=${sCat.id}&scname=${sCat.name}`}
                  passHref
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
          {/* <DropdownFooter>
            <h1>{categoryHover.name}</h1>
          </DropdownFooter> */}
        </DropdownWrapper>
      )}
      {showDropdown && <Overlay onClick={() => setShowDropdown(false)} />}
    </CategoriesNavbarStyled>
  );
};

CategoriesNavbar.propTypes = {
  _categories: PropTypes.array,
};
export default CategoriesNavbar;
