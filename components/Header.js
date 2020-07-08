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

const HeaderStyled = styled.header`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  max-height: 120px;

  @media (max-width: 768px) {
    background: ${({ theme }) => theme.colors.orangeYellowCrayola};
  }
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
    background: ${({ theme }) => theme.colors.orangeYellowCrayola};
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

const HeaderLogo = styled.div`
  flex: 1;
  margin: 10px 0 10px 100px;

  img {
    width: 200px;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    img {
      height: 100%;
    }
  }
`;

export default function Header() {
  return (
    <HeaderStyled>
      <Menu />
      <HeaderLogo>
        <img src='/images/logo_full.png' />
      </HeaderLogo>
      <HeaderSearch>
        <span>
          <RiSearchEyeLine />
        </span>
        <input type='text' placeholder='Buscar...' />
      </HeaderSearch>
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
    </HeaderStyled>
  );
}
