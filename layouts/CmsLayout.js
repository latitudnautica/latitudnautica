import  Link  from "next/link";
import styled from "styled-components";


const Container = styled.div`
  max-width: 1300px;
  margin: auto;
`;

const Header = styled.header`
  border: 1px solid green;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-height: 150px;
`;

export default function CmsLayout({ children }) {
  return (
    <Container>
      <Header>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </Header>
      {children}
    </Container>
  );
}
