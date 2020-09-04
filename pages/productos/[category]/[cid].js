/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axiosBase from '@/utils/axiosBase';
import MainLayout from '@/components/layouts/MainLayout';
import SidebarMenuProducts from '@/components/SidebarMenuProducts';
import ListProducts from '@/components/ListProducts';
import CategoriesNavbar from '@/components/CategoriesNavbar';

const ListSection = styled.section`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    display: block;
    /* flex-direction: column; */
  }
`;

const ProductsPageWrapper = ({ category, categories }) => {
  const [products, setProducts] = useState([]);
  const Router = useRouter();

  useEffect(() => {
    console.log('category', category);
    if (category) setProducts(category.Products);
  }, [category]);

  useEffect(() => {
    const applyFilter = (scid) => {
      const productsFiltered = category.Products.filter(
        (item) => item.SubCategoryId === Number(scid)
      );
      setProducts(productsFiltered);
    };

    if (Router.query.scid) {
      applyFilter(Router.query.scid);
    }
  }, [Router.query.scid, category]);

  if (Router.isFallback) {
    return <div>cargando...</div>;
  }
  return (
    <div>
      <CategoriesNavbar _categories={categories} />
      <ListSection>
        <SidebarMenuProducts category={category} />
        <ListProducts products={products} />
      </ListSection>
    </div>
  );
};

ProductsPageWrapper.Layout = MainLayout;

ProductsPageWrapper.propType = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    Products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  categories: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
    .isRequired,
};

export default ProductsPageWrapper;

export async function getStaticPaths() {
  const categories = await axiosBase('/category/all').then((res) => res.data);
  const paths = categories.map((cat) => ({
    params: { category: cat.name, cid: cat.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const categories = await axiosBase('/category/all').then((res) => res.data);
  const category = await axiosBase(`/category/${params.cid}`).then(
    (res) => res.data[0]
  );
  return { props: { category, categories }, revalidate: 1 };
}
