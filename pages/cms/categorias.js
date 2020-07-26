import { useState, useEffect } from "react";
import { useCategories } from "../../context/CategoriesProvider";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";

import BarLoader from "react-spinners/BarLoader";
import CmsLayout from "../../components/layouts/CmsLayout";
import CategoryTableItems from "../../components/cms/CategoryTableItems";

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

  div:hover {
    font-weight: bold;
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

const Select = styled.select`
  width: 100%;
  margin: 10px;
  height: 25px;
`;

const Categories = (props) => {
  const [lastDataAdded, setLastDataAdded] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { categories, handleClickCategory, categorySelected } = useCategories();

  const sendData = (data, type) => {
    setIsLoading(true);
    const url =
      type == "cat"
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/category/cat`
        : type == "subCat" &&
          `${process.env.NEXT_PUBLIC_API_URL}/api/category/subcat/`;
    axios
      .post(url, data, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      })
      .then((res) => {
        setLastDataAdded(res);
      })
      .catch((err) => console.log(err));
  };

  const enterName = (text) => {
    setIsLoading(true);
    const newName = prompt(text);
    if (newName == "" || newName === null) {
      console.log("prompt canceled");
      setIsLoading(false);
      return null;
    } else {
      if (newName.match(/^[a-zA-Z,\d\-_\s]+$/)) {
        return newName.toLowerCase();
      } else {
        setIsLoading(false);

        alert(
          `${newName} No esta permitido, Solo se permiten letras, numero y Comas. No se permiten puntos`
        );
      }
    }
  };

  const handleCategorySelector = (e) => {
    const cid = e.target.value;
    if (cid != 0) {
      const cat = categories.filter((c) => c.id == cid);
      handleClickCategory(cid);
    }
  };

  const handleUpdateSubCategory = (e) => {
    const subCatId = e.target.dataset.id;
    const newName = enterName("Ingresa el nuevo nombre ");

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/subcat/${subCatId}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
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
    if (newCategory == null) return;
    const payload = { name: newCategory };
    sendData(payload, "cat");
  };

  const handleAddSubCat = (e) => {
    const newSubCategory = enterName(
      `Ingresa una nueva SubCategoría dentro de categoría ${categorySelected.name}`
    );
    if (newSubCategory == null) return;

    const payload = { name: newSubCategory, categoryId: categorySelected.id };
    sendData(payload, "subCat");
  };

  const handleDeleteCategory = (e) => {
    const cid = e.target.dataset.id;

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/category/cat/${cid}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      })
      .then((res) => {
        console.log(res);
        setLastDataAdded(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CategoriesStyled>
      <ListContainer>
        <h2>Categoría</h2>
        <Select
          as='select'
          name='categoryId'
          onChange={handleCategorySelector}
          // onClick={handleCategorySelector}
          required
        >
          <option value={0}>------------</option>
          {categories.map((cat) => (
            <option key={cat.id} value={Number(cat.id)}>
              {cat.name}
            </option>
          ))}
        </Select>
        {categorySelected && (
          <div>
            <h4>
              <small>Nombre: </small>
              {categorySelected.name}
            </h4>
            <div>Descripción: {categorySelected.description}</div>
            <div>Imagen: {categorySelected.imageUrl}</div>
            <div>
              <button
                onClick={handleDeleteCategory}
                data-id={categorySelected.id}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
        <AddItem>
          {isLoading ? (
            <BarLoader height={10} width={"100%"} />
          ) : (
            <button onClick={handleAddCat}>Agregar Categoría</button>
          )}
        </AddItem>
        <p>
          Las categorías no se podrá borrar si hay productos que están
          relacionados esa categoría
        </p>
      </ListContainer>

      <ListContainer>
        {categorySelected ? (
          <>
            <CategoryTableItems
              itemsList={categorySelected.SubCategories}
              action={handleUpdateSubCategory}
            />
            <AddItem>
              {isLoading ? (
                <BarLoader height={10} width={"100%"} />
              ) : (
                categorySelected && (
                  <button onClick={handleAddSubCat}>Agregar</button>
                )
              )}
            </AddItem>
          </>
        ) : (
          <h3>Selecciona una Categoría</h3>
        )}
      </ListContainer>
    </CategoriesStyled>
  );
};

Categories.Layout = CmsLayout;

export default Categories;
