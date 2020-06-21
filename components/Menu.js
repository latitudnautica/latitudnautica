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
  }
`;

export default function Menu() {
  return (
    <MenuStyled>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/test'>
        <a>Test</a>
      </Link>
      <Link href='/lista/electricidad/2/productos'>
        <a>Productos</a>
      </Link>
    </MenuStyled>
  );
}
