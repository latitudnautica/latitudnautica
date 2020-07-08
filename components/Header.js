import styled from "styled-components";
import Menu from "../components/Menu";

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
  border: 1px solid red;
  flex: 2;
  margin: 15px;

  input {
    width: 90%;
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

  div {
    margin: 2px 0;
  }

  @media (max-width: 768px) {
    background: ${({ theme }) => theme.colors.orangeYellowCrayola};
    display: none;
  }
`;

const HeaderLogo = styled.div`
  flex: 1;
  margin: 0 0 0 100px;
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
        <img src='/images/logo.png' />
      </HeaderLogo>
      <HeaderSearch>
        <input type='text' />
      </HeaderSearch>
      <HeaderContactDetails>
        <div>Tel: +54 6545-1321</div>
        <div>@: info@latitudnautica.com.ar</div>
        <div>👤 ☯ ✍</div>
      </HeaderContactDetails>
    </HeaderStyled>
  );
}
