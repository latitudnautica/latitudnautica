import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  background-color: #f4f6ff;
  height: 100vh;
`;

const Header = styled.header`
  border-bottom: 1px solid green;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-height: 150px;
  a {
  }
`;

export default function CmsLayout({ children }) {
  return (
    <Container>
      <Header>
        <Link href='/' shallow={false}>
          <a>Home Page</a>
        </Link>
        <Link href='/cms/main' shallow={false}>
          <a>Dashboard</a>
        </Link>
        <Link href='/cms/cargar_producto' shallow={false}>
          <a>Cargar Producto</a>
        </Link>
        <Link href='/cms/editar' shallow={false}>
          <a>Editar Producto</a>
        </Link>
        <Link href='/cms/categorias' shallow={false}>
          <a>Categorías</a>
        </Link>
        <Link href='/cms/banners' shallow={false}>
          <a>Banners</a>
        </Link>
      </Header>
      {children}
    </Container>
  );
}
