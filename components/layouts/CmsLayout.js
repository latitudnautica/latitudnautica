import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "../../hoc/withAut";
import styled from "styled-components";
import Cookies from "js-cookie";

const MainContainer = styled.main`
  margin: auto;
  background-color: #1a202c;
`;

const Container = styled.section`
  min-height: calc(100vh - 120px);
  background-color: #f4f6ff;
  max-width: 1300px;
  margin: auto;
  padding: 2em 1em;
`;

const Header = styled.header`
  background-color: #f4f6ff;
  height: 100px;
  display: flex;
  margin-bottom: 25px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-height: 100px;

  a,
  div {
    border: 1px solid black;
    padding: 10px;

    :hover {
      border-color: orange;
    }
  }
`;

const CmsLayout = ({ children }) => {
  const Router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    Router.push("/cms/login");
  };
  return (
    <MainContainer>
      <Header>
        <Link href="/">
          <a>Home Page</a>
        </Link>
        <Link href="/cms/cargar_producto">
          <a>Cargar Producto</a>
        </Link>
        <Link href="/cms/editar">
          <a>Editar Producto</a>
        </Link>
        <Link href="/cms/categorias">
          <a>Categorías</a>
        </Link>
        <Link href="/cms/banners">
          <a>Banners</a>
        </Link>
        <div onClick={handleLogout}>Logout</div>
      </Header>
      <Container>{children}</Container>
    </MainContainer>
  );
};

export default withAuth(CmsLayout);
