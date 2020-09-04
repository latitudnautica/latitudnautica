import styled from 'styled-components';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Container = styled.main`
  position: relative;
  min-height: 80vh;
  margin: auto 0px;
`;

export default function MainLayout(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer>FOOTER</Footer>
    </>
  );
}
