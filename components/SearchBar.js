import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { RiSearchEyeLine } from "react-icons/ri";

const SearchBarStyled = styled.div`
  flex: 1;
  margin: 15px;
  position: relative;
  display: flex;
  align-items: center;

  span {
    position: relative;
    left: 45px;
    font-size: 2.5em;
    color: ${({ theme }) => theme.colors.orangeYellowCrayola};
  }
  input {
    font-family: "Roboto", sans-serif;
    width: 90%;
    height: 35px;
    border-radius: 25px;
    border: 1px solid gray;
    padding: 20px 50px;
    background-color: ${({ theme }) => theme.colors.charcoal};
    color: ${({ theme }) => theme.colors.orangeYellowCrayola};
    font-size: 1.2em;
    letter-spacing: 2px;
    font-weight: 200;

    :focus {
      border-radius: 25px;
      border: 1px solid gray;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
    text-align: center;
  }

  @media (max-width: 470px) {
    display: none;
  }
`;

const SearchButton = styled.div`
  display: none;
  margin-right: 10px;

  span {
    position: relative;
    left: 45px;
    font-size: 2.5em;
    color: ${({ theme }) => theme.colors.charcoal};
  }

  @media (max-width: 470px) {
    display: block;
    flex: 1;
  }
`;

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState(false);
  const Router = useRouter();

  const handleSearchValue = (e) => {
    const q = e.target.value;
    setSearchValue(q);
  };

  const handleSearch = (e) => {
    const key = e.key;
    if (key === "Enter") {
      Router.push({ pathname: "/buscar", query: { q: searchValue } });
    }
  };

  return (
    <SearchBarStyled>
      <input
        type='text'
        placeholder='Buscar...'
        onChange={handleSearchValue}
        onKeyPress={handleSearch}
        />
        {/* <span>
          <RiSearchEyeLine />
        </span> */}
      {/* <SearchButton onClick={() => setOpenModalSearch(!openModalSearch)}>
        <span>
          <RiSearchEyeLine />
        </span>
      </SearchButton> */}
    </SearchBarStyled>
  );
};

export default SearchBar;
