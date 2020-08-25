import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import axiosBase from "utils/axiosBase";
import FeaturedProducts from "components/FeaturedProducts";
import CategoriesNavbar from "@/components/CategoriesNavbar";
import MainLayout from "components/layouts/MainLayout";
import ListProducts from "components/ListProducts";
import {
  PageTitleH1,
  Container,
} from "components/layouts/commonStyledComponents";

const SearchProductsStyled = styled.section`
  margin-top: 3em;
`;
const ListSection = styled.div`
  display: flex;
  justify-content: center;
`;
const NoProductsFound = styled.div`
  display: flex;
  margin-top: 2em;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
    padding-right: 3em;
  }

  div {
    a {
      color: ${({ theme }) => theme.colors.primary};
      margin-top: 50px;
    }
  }
`;
const ProductsPageWrapper = ({ categories, featuredProducts }) => {
  const [products, setProducts] = useState(false);
  const Router = useRouter();
  const query = Router.query;

  const searchProducts = async () => {
    await axiosBase(`/product/search?q=${query.q}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

    return;
  };

  useEffect(() => {
    searchProducts();
  }, [query]);

  return (
    <>
      <CategoriesNavbar _categories={categories} />
      <Container>
        <SearchProductsStyled>
          <PageTitleH1>
            Resultados de la Búsqueda <small>"{query.q}"</small>
          </PageTitleH1>
          <ListSection>
            {products.length > 0 ? (
              <ListProducts products={products} />
            ) : (
              <NoProductsFound>
                <img src="images/no-products-found.png" />
                <div>
                  <Link href={`/contacto?searched=${query.q}`}>
                    <a>
                      <h2>No encontramos lo que buscaste</h2>
                      Envianos una consulta haciendo click acá.
                    </a>
                  </Link>
                </div>
              </NoProductsFound>
            )}
          </ListSection>
        </SearchProductsStyled>
        <FeaturedProducts featuredProducts={featuredProducts} />
      </Container>
    </>
  );
};

ProductsPageWrapper.Layout = MainLayout;

export default ProductsPageWrapper;

export async function getStaticProps() {
  const featuredProducts = await axiosBase("/product/featured").then(
    (res) => res.data
  );
  const categories = await axiosBase("/category/all").then((res) => res.data);

  return {
    props: {
      categories,
      featuredProducts,
    },
    revalidate: 1,
  };
}
