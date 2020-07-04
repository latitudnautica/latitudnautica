import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import CmsLayout from "../../layouts/CmsLayout";

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

  button {
    box-sizing: border-box;
    cursor: pointer;
    background-color: blue;
    text-transform: uppercase;
    color: white;
    padding: 10px;
    border: 1px solid blue;
    transition: all 200ms ease-in;
    margin: 3px;

    :hover {
      background-color: white;
      color: green;
      border: 1px solid blue;
    }
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

const Editar = (props) => {
  const [catSelected, setCatSelected] = useState(1);
  const [catData, setCatData] = useState(false);
  const { categories } = props;

  useEffect(() => {
    const fetchData = async () => {
      const categories = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/${catSelected}`
      )
        .then((res) => {
          setCatData(res.data[0]);
        })
        .catch((err) => console.log(err));

      return;
    };
    fetchData();
    console.log("fetch Data");
  }, [catSelected]);

  console.log("catData:", catData);

  const handleCategorySelector = (e) => {
    const id = e.target.value;
    setCatSelected(id);
  };

  const handleDeleteProduct = (e) => {
    const pid = e.target.dataset.pid;
    console.log(pid);
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${pid}`, pid)
      .then((res) => {
        console.log("deleted", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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
        {catData && (
          <CategoryInfoContainer>
            <CategoryInfoItem>
              <div>{catData.Products.length}</div>
              <div>productos</div>
            </CategoryInfoItem>
            <CategoryInfoItem>
              <div>{catData.SubCategories.length}</div>
              <div>sub categorías</div>
            </CategoryInfoItem>
            <CategoryInfoItem>
              <div>
                {catData.Products.filter((prod) => prod.visible == 0).length}
              </div>
              <div>Productos Ocultos</div>
            </CategoryInfoItem>
            <CategoryInfoItem>
              {catData.SubCategories.length > 0 &&
                catData.SubCategories.map((scat) => (
                  <button key={scat.id}>{scat.name}</button>
                ))}
            </CategoryInfoItem>
          </CategoryInfoContainer>
        )}
      </div>
      <div>
        <h4>Lista De Productos</h4>
        {catData && (
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
              {catData.Products.length > 0 &&
                catData.Products.map((prod) => {
                  return (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.name}</td>
                      <td>{catData.name}</td>
                      <td>{prod.SubCategoryId}</td>
                      <td>{prod.visible}</td>
                      <td>
                        <Link href={`/cms/editar_producto/${prod.id}`}>
                          <button>Editar</button>
                        </Link>
                        <button
                          data-pid={prod.id}
                          onClick={handleDeleteProduct}
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

Editar.Layout = CmsLayout;

export default Editar;

export async function getServerSideProps(context) {
  const fetchCategories = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`
  ).then((res) => res);

  const categories = fetchCategories.data;
  return {
    props: { categories } // will be passed to the page component as props
  };
}
