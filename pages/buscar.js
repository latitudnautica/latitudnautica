import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCategories } from "context/CategoriesProvider";
import axiosbase from "utils/axiosBase";
import styled from "styled-components";
import MainLayout from "components/layouts/MainLayout";
import ListProducts from "components/ListProducts";

const ListSection = styled.section`
  display: flex;
`;

const ProductsPageWrapper = () => {
  const [products, setProducts] = useState(false);
  const [filter, setFilter] = useState(false);
  const { categorySelected } = useCategories();
  const Router = useRouter();
  const query = Router.query;

  const searchProducts = async () => {
    await axiosbase(`/product/search?q=${query.q}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

    return;
  };

  useEffect(() => {
    searchProducts();
  }, [query]);

  console.log("Filtering by", filter);
  return (
    <div>
      <ListSection>
        {products.length > 0 ? (
          <ListProducts products={products} />
        ) : (
          <div>No se encontraron productos</div>
        )}
      </ListSection>
    </div>
  );
};

ProductsPageWrapper.Layout = MainLayout;

export default ProductsPageWrapper;
