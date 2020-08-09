import styled from "styled-components";
import ProductCard from "../components/ProductCard";
// import GridLoader from "react-spinners/GridLoader";

const ListProductsStyled = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NoProductsContactForm = styled.div`
  margin: auto;
  text-align: center;
`;

const ListProducts = ({ products }) => {
  if (products) {
    if (products.length !== 0) {
      return (
        <div>
          <ListProductsStyled>
            {products.map((item) => {
              return <ProductCard key={item.id} item={item} />;
            })}
          </ListProductsStyled>
        </div>
      );
    } else {
      return (
        <NoProductsContactForm>
          <h2>No hay productos en la Categoría Seleccionada</h2>
          <h4>envianos un mensaje consultándonos lo que estas buscando.</h4>
        </NoProductsContactForm>
      );
    }
  }
};
export default ListProducts;
