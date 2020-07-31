import styled from "styled-components";
import Menu from "../components/Menu";
import SearchBar from "./SearchBar";
import {
  RiWhatsappLine,
  RiFacebookCircleLine,
  RiInstagramLine,
  RiPhoneLine,
  RiMailSendLine
} from "react-icons/ri";
import { useState } from "react";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;

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

const HeaderContactDetails = styled.div`
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

  return (
    <HeaderStyled>
      <div>
        <Menu />
      </div>
      <HeaderContent>
        <HeaderLogo>
          <img src='/images/logo_full.png' />
        </HeaderLogo>
        <SearchBar />
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
