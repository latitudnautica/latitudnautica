import React, { useState, useEffect } from "react";
import Router from "next/router";
import styled from "styled-components";
import axios from "axios";
import CmsLayout from "../../layouts/CmsLayout";

const CategoriesStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const ListContainer = styled.div`
  width: 40%;
  margin: 20px;
  padding: 20px;
  background-color: white;
  box-shadow: inset 0px 0px 6px 0px grey;
  text-transform: capitalize;

  div:hover {
    font-weight: bold;
  }
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 20%;
  }
`;

const AddItem = styled.div`
  text-align: center;
  margin-top: 20px;

  button {
    cursor: pointer;
    padding: 15px;
    background-color: green;
    text-transform: uppercase;
    color: white;
    border: 1px solid green;
    transition: all 200ms ease-in;

    :hover {
      background-color: white;
      color: green;
      border: 1px solid green;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
  border: 1px solid gray;

  tr,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
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

    :hover {
      background-color: white;
      color: green;
      border: 1px solid blue;
    }
  }
`;

export default function Categories(props) {
  const [catSelectedId, setCatSelectedId] = useState(false);
  const [catSelected, setCatSelected] = useState(false);
  const [categories, setCategories] = useState([]);
  const [lastDataAdded, setLastDataAdded] = useState(null);
  // const { categories } = props;

  useEffect(() => {
    const fetchData = async () => {
      const categories = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`
      )
        .then((res) => res)
        .catch((err) => console.log(err));

      setCategories(categories.data);
    };
    fetchData();
  }, [lastDataAdded]);

  useEffect(() => {
    if (catSelectedId != false) {
      if (categories.length > 0) {
        const cat = categories.filter((c) => c.id == catSelectedId);
        console.log(cat);

        setCatSelected(cat[0]);
      }
    }
  }, [catSelectedId, categories]);

  console.log(catSelected);

  const sendData = (data, type) => {
    const url =
      type == "cat"
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/category/cat`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/category/subcat/`;
    axios
      .post(url, data)
      .then((res) => {
        setLastDataAdded(res);
      })
      .catch((err) => console.log(err));
  };

  const enterName = (text) => {
    const newName = prompt(text);
    if (newName == "" || newName === null) {
      console.log("prompt canceled");
      return null;
    } else {
      if (newName.match(/^[a-zA-Z,\d\-_\s]+$/)) {
        return newName.toLowerCase();
      } else {
        alert(
          `${newName} No esta permitido, Solo se permiten letras, numero y Comas. No se permiten puntos`
        );
      }
    }
  };

  const handleCategorySelector = (e) => {
    //marco cat id seleccionada
    const id = e.target.dataset.cid;
    const cat = categories.filter((c) => c.id == id);
    setCatSelectedId(cat[0].id);
  };

  const handleUpdateSubCategory = (e) => {
    const subCatId = e.target.dataset.scid;
    const newName = enterName("Ingresa el nuevo nombre");

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/subcat/${subCatId}`,
        { name: newName }
      )
      .then((res) => {
        console.log(res);
        setLastDataAdded(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCat = (e) => {
    const newCategory = enterName("Ingresa una nueva Categoría");
    const payload = { name: newCategory };
    if (newCategory == null) return;
    sendData(payload, "cat");
  };

  const handleAddSubCat = (e) => {
    const newSubCategory = enterName(
      `Ingresa una nueva SubCategoría dentro de categoría ${catSelected.name}`
    );
    if (newSubCategory == null) return;

    const payload = { name: newSubCategory, categoryId: catSelected.id };
    sendData(payload, "subcat");
  };

  return (
    <CategoriesStyled>
      <ListContainer>
        <h3>Categorías</h3>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr data-cid={cat.id} key={cat.id}>
                <td>{cat.id}</td>
                <td data-cid={cat.id} onClick={handleCategorySelector}>
                  {cat.name}
                </td>
                <td>
                  <button data-cid={cat.id} onClick={handleCategorySelector}>
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddItem>
          <button onClick={handleAddCat}>Agregar Categoría</button>
        </AddItem>
      </ListContainer>
      <ListContainer>
        {catSelected ? (
          <ListHeader>
            <h3>
              {catSelected.name.toUpperCase()}
              <br /> <small> / Sub Categorías</small>
            </h3>
            <img
              src={
                catSelected.imageUrl ? catSelected.imageUrl : "/images/test.png"
              }
            />
          </ListHeader>
        ) : (
          <h3>Selecciona una Categoría</h3>
        )}
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {catSelected &&
              catSelected.SubCategories.map((subCat) => (
                <tr data-scid={subCat.id} key={subCat.id}>
                  <td>{subCat.id}</td>
                  <td> {subCat.name}</td>
                  <td>
                    <button
                      data-scid={subCat.id}
                      onClick={handleUpdateSubCategory}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {catSelected && (
          <AddItem>
            <button onClick={handleAddSubCat}>Agregar</button>
          </AddItem>
        )}
      </ListContainer>
    </CategoriesStyled>
  );
}

Categories.Layout = CmsLayout;

// export async function getServerSideProps(context) {
//   // console.log(context);

//   const categories = await axios(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`
//   ).then((res) => res);
//   // console.log("cat getServer", categories);

//   const data = categories.data;
//   return {
//     props: { categories: data } // will be passed to the page component as props
//   };
// }
