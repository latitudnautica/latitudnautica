/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import useSWR, { trigger } from 'swr';
import styled from 'styled-components';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { TiTickOutline, TiDelete } from 'react-icons/ti';

import { Button } from '@/components/layouts/Button';
import CmsLayout from '@/components/layouts/CmsLayout';
import axiosBase from '@/utils/axiosBase';
import { PageTitleH1 } from '@/components/layouts/commonStyledComponents';

const Select = styled.select`
  border: none;
  height: 35px;
  width: 200px;
  margin: 0 0 0 25px;
  padding: 0 15px;
  font-size: 1.1em;

  option {
    margin: 5px 0;
  }
`;

const Table = styled.table`
  width: 90%;
  margin: 0 25px;
  text-align: center;
  border: 1px solid gray;
  background-color: white;

  tr,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    font-weight: bold;
  }
`;
const CategorySelectContainer = styled.div`
  margin: 1em 25px;
`;

const CategoryInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em 25px;
  justify-content: space-evenly;
`;
const CategoryInfoItem = styled.div`
  width: 150px;
  height: 75px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px -3px black;
  justify-content: center;
  align-items: center;

  div:nth-child(1) {
    font-size: 1.5em;
  }
  div:nth-child(2) {
    font-size: 0.9em;
    color: gray;
  }
`;

const Icon = styled.span`
  font-size: 1.8em;
  color: #7c95c3;
`;

const Editar = ({ categories }) => {
  const [catSelected, setCatSelected] = useState(1);
  const [categoryData, setCategoryData] = useState(false);

  const { data, error } = useSWR(`/category/${catSelected}?nocache`);

  useEffect(() => {
    if (data) {
      setCategoryData(data.data[0]);
    }
  }, [data]);

  if (data === 'undefined') return <div>Cargando</div>;
  if (error) return <div>algo salio mal</div>;
  
  const handleCategorySelector = (e) => {
    const id = e.target.value;
    setCatSelected(id);
    trigger(`/category/${catSelected}?nocache`);
  };

  const handleDeleteProduct = (e) => {
    const { pid } = e.target.dataset;
    axiosBase
      .delete(`/product/${pid}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      .then((res) => {
        trigger(`/category/${catSelected}?nocache`);
        toast.success(' Producto Eliminado');
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const getSubCategoryName = (scid) => {
    if (categoryData.SubCategories.length === 0) {
      return 'no name';
    }

    const subCategory = categoryData.SubCategories.find(
      (subCat) => subCat.id == scid
    );

    if (subCategory == undefined) {
      return 'ATENCIÓN: sub categoría perdida';
    }
    return subCategory.name;
  };

  return (
    <CmsLayout>
      <PageTitleH1>EDITAR</PageTitleH1>
      <div>
        <CategorySelectContainer>
          Elige una Categoría:
          <Select onClick={handleCategorySelector}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </CategorySelectContainer>
        {categoryData && (
          <CategoryInfoContainer>
            <CategoryInfoItem>
              <div>{categoryData.Products.length}</div>
              <div>productos</div>
            </CategoryInfoItem>
            <CategoryInfoItem>
              <div>{categoryData.SubCategories.length}</div>
              <div>sub categorías</div>
            </CategoryInfoItem>
            <CategoryInfoItem>
              <div>
                {
                  categoryData.Products.filter((prod) => prod.visible == 0)
                    .length
                }
              </div>
              <div>Productos Ocultos</div>
            </CategoryInfoItem>
            <CategoryInfoItem>
              <div>
                {
                  categoryData.Products.filter((prod) => prod.featured == 1)
                    .length
                }
              </div>
              <div>Productos Destacados</div>
            </CategoryInfoItem>
          </CategoryInfoContainer>
        )}
      </div>
      <div>
        <h4>Lista De Productos</h4>
        {categoryData && (
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Sub Categoría</th>
                <th>visible</th>
                <th>Destacado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.Products.length > 0 &&
                categoryData.Products.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.name}</td>
                    <td>{prod.brand}</td>
                    <td>{prod.price}</td>
                    <td>{categoryData.name}</td>
                    <td>{getSubCategoryName(prod.SubCategoryId)}</td>
                    <td>
                      <Icon>
                        {prod.visible ? <TiTickOutline /> : <TiDelete />}
                      </Icon>
                    </td>
                    <td>
                      <Icon>
                        {prod.featured ? <TiTickOutline /> : <TiDelete />}
                      </Icon>
                    </td>
                    <td>
                      <Link
                        href='/cms/editar_producto/[pid]'
                        as={`/cms/editar_producto/${prod.id}`}
                      >
                        <a>
                          <Button>Editar</Button>
                        </a>
                      </Link>
                      <Button data-pid={prod.id} onClick={handleDeleteProduct}>
                        Borrar
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </CmsLayout>
  );
};

export default Editar;

export async function getServerSideProps() {
  const categories = await axiosBase('/category/all?nocache').then(
    (res) => res.data
  );

  return {
    props: { categories }, // will be passed to the page component as props
  };
}
