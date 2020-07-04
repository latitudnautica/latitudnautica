import Link from "next/link";
import styled from "styled-components";

const MenuStyled = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-left: 100px;
  /* height: 100% */

  a {
    margin: 10px;
    /* color: white; */
    text-transform: uppercase;
    transition: all 300ms ease-in;

    :hover {
      font-weight: 700;
    }
  }
`;

export default function Menu() {
  return (
    <MenuStyled>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/cms/main'>
        <a>Administrar</a>
      </Link>
      <Link href='/productos'>
        <a>Productos</a>
      </Link>
    </MenuStyled>
  );
}
