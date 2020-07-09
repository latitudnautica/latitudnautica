import styled from "styled-components";
import Menu from "../components/Menu";
import {
  RiWhatsappLine,
  RiFacebookCircleLine,
  RiInstagramLine,
  RiPhoneLine,
  RiMailSendLine,
  RiSearchEyeLine
} from "react-icons/ri";
import { useState } from "react";

const HeaderStyled = styled.header`
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center; */

  /* @media (max-width: 470px) {
    justify-content: space-between;
  } */
`;
const HeaderContent = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;
const HeaderLogo = styled.div`
  /* border: 1px solid green; */
  flex: 1;
  margin: 10px 0 10px 0;
  /* height: 120px; */
  display: flex;
  img {
    width: 100%;
  }

  /* @media (max-width: 768px) {
    height: 100px;
  }*/

  @media (max-width: 470px) {
    flex: 1;

    img {
      width: 100%;
    }
  }
  /*
  @media (max-width: 320px) {
    height: 80px;
  } */
`;

const HeaderSearch = styled.div`
  /* border: 1px solid red; */
  flex: 2;
  margin: 15px;
  position: relative;
  display: flex;
  align-items: normal;

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

const HeaderContactDetails = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-right: 25px;
  align-items: flex-end;
  flex: 1;
  color: ${({ theme }) => theme.colors.primary};

  div {
    margin: 2px 0;
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MediaIcons = styled.div`
  font-size: 1.5em;
  a {
    margin: 0 15px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Header() {
  const [openModalSearch, setOpenModalSearch] = useState(false);
  console.log("showModal>>", openModalSearch);

  return (
    <HeaderStyled>
      <div>
        <Menu />
      </div>
      <HeaderContent>
        <HeaderLogo>
          <img src='/images/logo_full.png' />
        </HeaderLogo>
        <HeaderSearch>
          <span>
            <RiSearchEyeLine />
          </span>
          <input type='text' placeholder='Buscar...' />
        </HeaderSearch>
        <SearchButton onClick={() => setOpenModalSearch(!openModalSearch)}>
          <span>
            <RiSearchEyeLine />
          </span>
        </SearchButton>
        <HeaderContactDetails>
          <div>
            <RiPhoneLine /> +54 6545-1321
          </div>
          <div>
            <RiMailSendLine /> info@latitudnautica.com.ar
          </div>
          <MediaIcons>
            <a href='/'>
              <RiWhatsappLine />
            </a>
            <a href='/'>
              <RiInstagramLine />
            </a>
            <a href='https://www.facebook.com/profile.php?id=100004283867132'>
              <RiFacebookCircleLine />
            </a>
          </MediaIcons>
        </HeaderContactDetails>
      </HeaderContent>
    </HeaderStyled>
  );
}
