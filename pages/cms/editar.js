import React, { useState, useEffect } from "react";
import axiosbase from "../../utils/axiosBase";
import useSWR, { trigger } from "swr";
import styled from "styled-components";
import Link from "next/link";
import Cookies from "js-cookie";
import Button from "../../components/Button";
import CmsLayout from "../../components/layouts/CmsLayout";
import { useAlert } from "react-alert";

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
  width: 100%;
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

  tr::hover {
    font-weight: bold;
  }
`;
const CategoryInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 25px;
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

const Editar = ({ categories }) => {
  const [catSelected, setCatSelected] = useState(1);
  const [categoryList, setCategoryList] = useState(false);
  const Alert = useAlert();

  const { data, error } = useSWR(`/category/${catSelected}`);
  console.log(data);
  if (data == "undefined") return <div>Cargando</div>;
  if (error) return <div>algo salio mal</div>;

  useEffect(() => {
    if (data) {
      setCategoryList(data.data[0]);
    }
  }, [data]);

  const handleCategorySelector = (e) => {
    const id = e.target.value;
    setCatSelected(id);
    trigger(`/category/${catSelected}`);
  };

  const handleDeleteProduct = (e) => {
    console.log("delete product clicked");
    const pid = e.target.dataset.pid;
    axiosbase
      .delete(`/product/${pid}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        console.log("deleted", res);
        trigger(`/category/${catSelected}`);
        Alert.success(" Producto Eliminado");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  console.log(categoryList);
  return (
    <CmsLayout>
      <h1>EDITAR</h1>
      <div>
        <h3>
          Elige una Categoría:
          <Select onClick={handleCategorySelector}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </h3>
        {categoryList && (
          <CategoryInfoContainer>
            {/* <CategoryInfoItem>
              <div>{categoryList.Products.length}</div>
              <div>productos</div>
            </CategoryInfoItem> */}
            {/* <CategoryInfoItem>
              <div>{categoryList.SubCategories.length}</div>
              <div>sub categorías</div>
            </CategoryInfoItem> */}
            {/* <CategoryInfoItem>
              <div>
                {
                  categoryList.Products.filter((prod) => prod.visible == 0)
                    .length
                }
              </div>
              <div>Productos Ocultos</div>
            </CategoryInfoItem> */}
            {/* <CategoryInfoItem>
              {categoryList.SubCategory.length > 0 &&
                categoryList.SubCategories((scat) => (
                  <button key={scat.id}>{scat.name}</button>
                ))}
            </CategoryInfoItem> */}
          </CategoryInfoContainer>
        )}
      </div>
      <div>
        <h4>Lista De Productos</h4>
        {categoryList && (
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Sub Categoría</th>
                <th>visible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.Products.length > 0 &&
                categoryList.Products.map((prod) => {
                  return (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.name}</td>
                      <td>{categoryList.name}</td>
                      <td>{prod.SubCategoryId}</td>
                      <td>{prod.visible}</td>
                      <td>
                        <Link
                          href={`/cms/editar_producto/[pid]`}
                          as={`/cms/editar_producto/${prod.id}`}
                        >
                          <a>
                            <Button>Editar</Button>
                          </a>
                        </Link>
                        <Button
                          data-pid={prod.id}
                          onClick={handleDeleteProduct}
                        >
                          Borrar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </div>
    </CmsLayout>
  );
};

export default Editar;

export async function getServerSideProps(context) {
  const fetchCategories = await axiosbase(`/category/all`)
    .then((res) => res)
    .catch((err) => console.log(err));

  const categories = fetchCategories.data;
  return {
    props: { categories }, // will be passed to the page component as props
  };
}
