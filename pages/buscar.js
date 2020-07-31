import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCategories } from "../context/CategoriesProvider";
import axios from "axios";
import styled from "styled-components";
import MainLayout from "../components/layouts/MainLayout";
import ListProducts from "../components/ListProducts";

const ListSection = styled.section`
  display: flex;
`;

const ProductsPageWrapper = () => {
  const [products, setProducts] = useState(false);
  const [filter, setFilter] = useState(false);
  const { categorySelected } = useCategories();
  const Router = useRouter();
  const query = Router.query;
  console.log(query);

  const searchProducts = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/product/search?q=${query.q}`;

    await axios(url)
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
