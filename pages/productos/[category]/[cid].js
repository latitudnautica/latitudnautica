/* eslint-disable import/no-unresolved */
import Head from 'next/head';
import Error from 'next/error';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axiosBase from '@/utils/axiosBase';
import useSWR from 'swr';
import MainLayout from '@/components/layouts/MainLayout';
import SidebarMenuProducts from '@/components/SidebarMenuProducts';
import ListProducts from '@/components/ListProducts';
import CategoriesNavbar from '@/components/CategoriesNavbar';
import Loading from '@/components/Loading';

const ListSection = styled.section`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    display: block;
    /* flex-direction: column; */
  }
`;

const ProductsPageWrapper = ({ categories }) => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const Router = useRouter();
  const { data, error } = useSWR(`/category/${Router.query.cid}`);
  
  useEffect(() => {
    if (data) {
      setCategory(data.data);
      if (data.data === null) {
        setProducts([]);
      } else {
        setProducts(data.data.Products);
      }
    }
  }, [data]);
  
  useEffect(() => {
    const applyFilter = (scid) => {
      const productsFiltered = category.Products.filter(
        (item) => item.SubCategoryId === Number(scid)
        );
        setProducts(productsFiltered);
      };
      
      if (category) {
        if (Router.query.scid) {
          applyFilter(Router.query.scid);
        } else {
          setProducts(category.Products);
        }
      }
    }, [Router, category]);

    if (Router.isFallback) {
      return <Loading />;
    }

    if (error) return <div>error obteniendo los productos.</div>;
    if (!data) return <Loading />;
    if (data.data === null) return <Error title="ups, nos quedamos varados, no sabemos como llegaste aca. Empezá de nuevo haciendo click en el logo"/>;
    
    return (
      <>
      <Head>
        <title>Latitud Náutica - {category && category.name}</title>
        <meta
          property='og:title'
          content='Latitud Náutica - Venta y Fabricación de Equipamiento Náutico'
        />
        <meta property='og:site_name' content='Latitud Náutica' />
        <meta
          property='og:url'
          content={`https://www.latitudnautica.com.ar/${
            category && category.name
          }/${category && category.id}`}
        />
        <meta
          property='og:description'
          content='Somos una empresa dedicada a la venta y fabricación de equipamiento náutico. venta de insumos y servicios integrales de mantenimiento, tanto en guarderías, clubes o astilleros.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content='https://www.latitudnautica.com.ar/images/logo_full.png'
        />
      </Head>
      <div>
        <CategoriesNavbar _categories={categories} />
        <ListSection>
          {category && <SidebarMenuProducts category={category} />}
          <ListProducts products={products} />
        </ListSection>
      </div>
    </>
  );
};

ProductsPageWrapper.Layout = MainLayout;

ProductsPageWrapper.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};

export default ProductsPageWrapper;

export async function getStaticPaths() {
  const categories = await axiosBase('/category/all?nocache').then(
    (res) => res.data
  );
  const paths = categories.map((cat) => ({
    params: { category: cat.name, cid: cat.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const categories = await axiosBase('/category/all?nocache').then(
    (res) => res.data
  );

  return { props: { categories }, revalidate: 1 };
}
