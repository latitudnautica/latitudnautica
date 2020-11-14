/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from 'styled-components';
import Link from 'next/link';
import { FaWhatsapp, FaEnvelope, FaFacebook } from 'react-icons/fa';
import contactData from '@/utils/contactData';
import {
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from '@/components//layouts/commonStyledComponents';
import Menu from './Menu';
import SearchBar from './SearchBar';

const HeaderStyled = styled.header`
  box-shadow: 0 0 13px -2px #acb1b3;
  border-radius: 0 0 30px 30px;
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuWrapper = styled.div`
  flex: 1;
  max-width: 80px;
  min-width: 80px;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLogo = styled.div`
  padding: 1em 0;
  text-align: center;
  flex: 1;

  img {
    width: 100%;
    max-width: fit-content;
  }

  @media (max-width: 768px) {
    /* padding: 10px 1em; */
    flex: 1;
    img {
      width: 100%;
    }
  }

  @media (max-width: 470px) {
    /* padding: 10px 1em; */
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
  flex: 3;

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
  }
`;

const SocialIcons = styled(ContactDetail)`
  a {
    margin: 0 8px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 10px;
    a {
      margin: 2npm run px;
    }
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
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <ContentWrapper>
        <HeaderLogo>
          <Link href='/'>
            <a>
              <img src='/images/logo_full.png' alt='Logo de latitud náutica' />
            </a>
          </Link>
        </HeaderLogo>
        <ResponsiveWrapper>
          <SearchBar />

          <ContactDetailsWrapper>
            <ContactDetail>
              <a
                href={`https://wa.me/${contactData.celularPhone.number}`}
                target='_blank'
                rel='noreferrer'
              >
                {contactData.celularPhone.display}
              </a>
            </ContactDetail>
            <ContactDetail>
              <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
            </ContactDetail>
            <SocialIcons>
              <FacebookIcon
                href={contactData.facebook}
                target='_blank'
                rel='noreferrer'
              >
                <FaFacebook />
              </FacebookIcon>
              <WhatsappIcon
                href={`https://wa.me/${contactData.celularPhone.number}`}
                target='_blank'
                rel='noreferrer'
              >
                <FaWhatsapp />
              </WhatsappIcon>
              <EmailIcon href={`mailto:${contactData.email}`}>
                <FaEnvelope />
              </EmailIcon>
            </SocialIcons>
          </ContactDetailsWrapper>
        </ResponsiveWrapper>
      </ContentWrapper>
    </HeaderStyled>
  );
}
