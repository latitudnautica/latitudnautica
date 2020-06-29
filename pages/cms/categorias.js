import React, { useState } from "react";
import Router from "next/router";
import styled from "styled-components";
import axios from "axios";
import CmsLayout from "../../layouts/CmsLayout";

const CategoriesStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
`;
const ListContainer = styled.div`
  width: 350px;
  margin: 20px;
  padding: 20px;
  background-color: white;
  box-shadow: inset 0px 0px 6px 0px grey;
  text-transform: capitalize;

  div {
    border-bottom: 1px solid gray;
    cursor: pointer;
  }

  div:hover {
    font-weight: bold;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  img {
    width: 50px;
    margin-right: 10%;
  }
`;

export default function Categories(props) {
  const [catSelected, setCatSelected] = useState(false);
  const [newCategory, setNewCategory] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState(false);
  const { categories } = props;
  const sendData = (data, type) => {
    const url =
      type == "cat"
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/category/cat`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/category/subcat/`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleCategorySelector = (e) => {
    const id = e.target.id;
    const cat = categories.filter((c) => c.id == id);
    setCatSelected(cat[0]);
  };

  const handleUpdateSubCategory = (e) => {
    const subCatId = e.target.dataset.scid;
    const newName = prompt("ingresa un nuevo nombre");
    if (!newName) return;

    if (newName.match(/^[a-zA-Z,\d\-_\s]+$/)) {
      const data = { name: newName.toLowerCase() };
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/category/subcat/${subCatId}`,
          data
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(`${newName} No esta permitido, Solo se permiten letras, numero y Comas. No se permiten puntos`);
    }
  };

  const handleInputCat = (e) => {
    const value = e.target.value;
    setNewCategory(value);
  };
  const handleInputSubCat = (e) => {
    const value = e.target.value;
    setNewSubCategory(value);
  };
  const handleAddCat = (e) => {
    const value = { name: newCategory };
    //Validation

    if (!newCategory == "") {
      sendData(value, "cat");
    } else {
      alert("el campo categoría esta vacío");
    }
  };
  const handleAddSubCat = (e) => {
    const value = { name: newSubCategory, categoryId: catSelected.id };
    //Validation
    if (!newSubCategory == "") {
      sendData(value, "subcat");
    } else {
      alert("el campo sub categoría esta vacío");
    }
  };
  return (
    <CategoriesStyled>
      <ListContainer>
        <h3>Categorías</h3>
        {categories.map((cat) => (
          <ListItem id={cat.id} key={cat.id} onClick={handleCategorySelector}>
            <img src={cat.imageUrl ? cat.imageUrl : "/images/test.png"} />{" "}
            {cat.name}
          </ListItem>
        ))}
        <ListItem>
          <label>agregar</label>
          <input type='text' name='subCat' onChange={handleInputCat} />
          <button onClick={handleAddCat}>{">>"}</button>
        </ListItem>
      </ListContainer>
      <ListContainer>
        <h3></h3>
        {catSelected ? (
          <h3>
            {catSelected.name.toUpperCase()} <small> / Sub Categorías</small>
          </h3>
        ) : (
          <h3>Selecciona una Categoría</h3>
        )}

        {catSelected &&
          catSelected.SubCategories.map((subCat) => (
            <ListItem id={subCat.id} key={subCat.id}>
              {subCat.id} - {subCat.name}
              <div data-scid={subCat.id} onClick={handleUpdateSubCategory}>
                Editar
              </div>
            </ListItem>
          ))}
        {catSelected && (
          <ListItem>
            <label>agregar</label>
            <input type='text' name='subCat' onChange={handleInputSubCat} />
            <button onClick={handleAddSubCat}>{">>"}</button>a
          </ListItem>
        )}
      </ListContainer>
    </CategoriesStyled>
  );
}

Categories.Layout = CmsLayout;

export async function getServerSideProps(context) {
  // console.log(context);

  const categories = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`
  ).then((res) => res);
  // console.log("cat getServer", categories);

  const data = categories.data;
  return {
    props: { categories: data } // will be passed to the page component as props
  };
}
