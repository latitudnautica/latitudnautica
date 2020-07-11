import styled from "styled-components";
import Link from 'next/link'

const MenuStyled = styled.div`
  display: inline;
`;

const Menu = (props) => {
  console.log(props);

  return (
      <MenuStyled>
        <Link href='/cms/cargar_producto'>
          <a>Cargar Producto</a>
        </Link>
      </MenuStyled>
  );
};

export default Menu;
