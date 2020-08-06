import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Menu from "../components/Menu";
import SearchBar from "./SearchBar";
import {
  RiWhatsappLine,
  RiFacebookCircleLine,
  RiInstagramLine,
  RiPhoneLine,
  RiMailSendLine,
} from "react-icons/ri";

const HeaderStyled = styled.header`
  box-shadow: 0 0 13px -2px #acb1b3;
  border-radius: 0 0 30px 30px;
`;

const ContentWrapper = styled.div`
  /* border: 1px solid blue; */
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* width: 100%; */
`;

const HeaderLogo = styled.div`
  /* border: 2px solid green; */
  padding: 10px 0;
  text-align: center;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex: 1;
    img {
      width: 100%;
    }
  }

  @media (max-width: 470px) {
    img {
      width: 100%;
    }
  }
  /*
  @media (max-width: 320px) {
    height: 80px;
  } */
`;

const ResponsiveWrapper = styled.div`
  /* border: 2px solid yellow; */
  display: flex;
  flex-direction: row;
  width: 75%;
  transition: all 0.2s;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const ContactDetailsWrapper = styled.div`
  /* border: 1px solid blue; */
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ContactDetail = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    margin: 2px;
  }
`;

const MediaIcons = styled(ContactDetail)`
  font-size: 1.5em;
  a {
    margin: 0 15px;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    right: 0;
    margin-top: 10px;
  }
`;

export default function Header() {
  const [openModalSearch, setOpenModalSearch] = useState(false);

  return (
    <HeaderStyled>
      <ContentWrapper>
        {/* <div> */}
        <Menu />
        {/* </div> */}
        <HeaderLogo>
          <Link href={"/"}>
            <a>
              <img src="/images/logo_full.png" />
            </a>
          </Link>
        </HeaderLogo>
        <ResponsiveWrapper>
          <SearchBar />

          <ContactDetailsWrapper>
            <ContactDetail>
              <RiPhoneLine /> +54 6545-1321
            </ContactDetail>
            <ContactDetail>
              <RiMailSendLine /> info@latitudnautica.com.ar
            </ContactDetail>
            <MediaIcons>
              <a href="/">
                <RiWhatsappLine />
              </a>
              <a href="/">
                <RiInstagramLine />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100004283867132">
                <RiFacebookCircleLine />
              </a>
            </MediaIcons>
          </ContactDetailsWrapper>
        </ResponsiveWrapper>
      </ContentWrapper>
    </HeaderStyled>
  );
}
