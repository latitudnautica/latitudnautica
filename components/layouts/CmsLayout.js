import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "../../hoc/withAut";
import styled from "styled-components";
import Cookies from "js-cookie";
const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  background-color: #f4f6ff;
  min-height: 100vh;
`;

const Header = styled.header`
  border-bottom: 1px solid green;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-height: 150px;
`;

const CmsLayout = ({ children }) => {
  const Router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    Router.push("/cms/login");
  };
  return (
    <Container>
      <Header>
        <Link href='/'>
          <a>Home Page</a>
        </Link>
        <Link href='/cms/main'>
          <a>Dashboard</a>
        </Link>
        <Link href='/cms/cargar_producto'>
          <a>Cargar Producto</a>
        </Link>
        <Link href='/cms/editar'>
          <a>Editar Producto</a>
        </Link>
        <Link href='/cms/categorias'>
          <a>Categorías</a>
        </Link>
        <Link href='/cms/banners'>
          <a>Banners</a>
        </Link>
        <div onClick={handleLogout}>Logout</div>
      </Header>
      {children}
    </Container>
  );
};

export default withAuth(CmsLayout);
