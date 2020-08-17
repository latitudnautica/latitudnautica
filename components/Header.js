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
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLogo = styled.div`
  padding: 10px 0;
  text-align: center;
  flex: 1;

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
    flex: 2;
    img {
      width: 100%;
    }
  }
`;

const ResponsiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  transition: all 0.2s;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    flex: 2;
  }
`;

const ContactDetailsWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 2em;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 1em;
  }

  @media (max-width: 470px) {
    flex: 1;
    margin-right: 0px;
  }
`;

const ContactDetail = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    margin: 2px;
  }
`;

const SocialIcons = styled(ContactDetail)`
  font-size: 1.5em;
  a {
    margin: 0 15px;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    right: -5px;
    top: 25px;
  }
  @media (max-width: 470px) {
    flex-direction: row;
    position: relative;
    top: 0;
    right: 0;
  }
`;

export default function Header() {
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
            <SocialIcons>
              <a href="/">
                <RiWhatsappLine />
              </a>
              <a href="/">
                <RiInstagramLine />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100004283867132">
                <RiFacebookCircleLine />
              </a>
            </SocialIcons>
          </ContactDetailsWrapper>
        </ResponsiveWrapper>
      </ContentWrapper>
    </HeaderStyled>
  );
}
