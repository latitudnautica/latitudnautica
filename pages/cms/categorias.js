import { useState, useEffect } from "react";
import styled from "styled-components";
import axiosBase from "../../utils/axiosBase";
import Cookies from "js-cookie";
import useSWR, { trigger } from "swr";
import { positions, useAlert } from "react-alert";
import BarLoader from "react-spinners/BarLoader";
import CmsLayout from "../../components/layouts/CmsLayout";
import CategoryTableItems from "../../components/cms/CategoryTableItems";
import { Button } from "../../components/Button";

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
`;

const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  div {
    cursor: pointer;
    text-transform: uppercase;
    margin: 0.5em;

    :hover {
      font-weight: bold;
    }
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

const Categories = (props) => {
  // const [lastDataAdded, setLastDataAdded] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();
  const { data, error } = useSWR("/category/all");
  if (error) console.log(error);

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (categoryId && categories.length > 0) {
      const cat = categories.filter((c) => c.id == categoryId)[0];
      setCategorySelected(cat);
    } else {
      setCategorySelected(false);
    }
  }, [categoryId, categories]);

  const handleCategorySelector = (e) => {
    const cid = e.target.dataset.cid;
    if (cid != 0) {
      setCategoryId(cid);
    } else {
      setCategoryId(null);
    }
  };

  const handleUpdateSubCategory = (e) => {
    const subCatId = e.target.dataset.id;
    const newName = enterName("Ingresa el nuevo nombre ");

    axiosBase
      .put(
        `/category/subcat/${subCatId}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      )
      .then((res) => {
        // console.log(res);
        // setLastDataAdded(res);
        setIsLoading(false);
        trigger("/category/all");
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
        alert.error(
          `Algo no funciono como se esperaba... [ ${err.response.data.message} ]`
        );
      });
  };

  const sendData = (data, type) => {
    setIsLoading(true);
    const url =
      type == "cat"
        ? `/category/category`
        : type == "subCat" && `/category/subcategory`;
    axiosBase
      .post(url, data, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        setIsLoading(false);
        trigger("/category/all");
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
        alert.error(
          `Algo no funciono como se esperaba... [ ${err.response.data.message} ]`
        );
      });
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
  const handleAddCat = (e) => {
    const newCategory = enterName("Ingresa una nueva Categoría");
    if (newCategory == null) return;
    const payload = { name: newCategory };
    sendData(payload, "cat");
    trigger("/category/all");
  };

  const handleAddSubCat = (e) => {
    const newSubCategory = enterName(
      `Ingresa una nueva SubCategoría dentro de categoría ${categorySelected.name}`
    );
    if (newSubCategory == null) return;

    const payload = { name: newSubCategory, categoryId: categorySelected.id };
    sendData(payload, "subCat");
  };

  // const handleDeleteCategory = (e) => {
  //   const cid = e.target.dataset.id;

  //   axios
  //     .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/category/cat/${cid}`, {
  //       headers: { Authorization: `Bearer ${Cookies.get("token")}` }
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setLastDataAdded(null);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  if (!data) return <div> Error al cargar las categorías </div>;
  if (error) return <div> Error al cargar las categorías </div>;
  return (
    <CategoriesStyled>
      <ListContainer>
        <h2>Categorías</h2>
        <small>click en una categoría para ver detalles</small>
        <ListItems>
          {categories.map((cat) => (
            <div
              key={cat.id}
              data-cid={Number(cat.id)}
              onClick={handleCategorySelector}
            >
              {cat.name}
            </div>
          ))}
        </ListItems>
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
        {categorySelected && (
          <div>
            <h4>
              <small>Categoría: </small>
              {categorySelected.name}
            </h4>
            <div>Descripción: {categorySelected.description}</div>
            <div>
              Imagen:{" "}
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${categorySelected.imageUrl}`}
              />
            </div>
            {/* <div>
              <button
                onClick={handleDeleteCategory}
                data-id={categorySelected.id}
              >
                Eliminar
              </button>
            </div> */}
          </div>
        )}
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
