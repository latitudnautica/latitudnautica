import { useState, useEffect } from "react";
import styled from "styled-components";
import axiosBase from "../../utils/axiosBase";
import Cookies from "js-cookie";
import useSWR, { trigger, mutate } from "swr";
import CmsLayout from "../../components/layouts/CmsLayout";
import SubCategoryTableItems from "../../components/cms/SubCategoryTableItems";
import { toast } from "react-toastify";
import { GoTrashcan } from "react-icons/go";
import { Button } from "../../components/layouts/Button";
import { _delete, _create } from "@/utils/api/services";

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
const SubCategoriesHeader = styled.div``;

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
const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  const { data, error } = useSWR("/category/all", { refreshInterval: 20000 });
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
        toast.success("categoría Actualizada");
        setIsLoading(false);
        trigger("/category/all");
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
        toast.error(
          `Algo no funciono como se esperaba... [ ${err.response.data.message} ]`
        );
      });
  };

  const enterName = (text) => {
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
        toast(
          `${newName} No esta permitido, Solo se permiten letras, numero y Comas. No se permiten puntos`
        );
        return null;
      }
    }
  };

  const handleAddCat = (e) => {
    setIsLoading(true);
    const newCategory = enterName("Ingresa una nueva Categoría");
    if (newCategory == null) return;
    const payload = { name: newCategory };
    console.log("add category");

    _create(payload, "category")
      .then((res) => {
        console.log(res);
        trigger("/category/all");
        setIsLoading(false);
        toast.success("Categoría Creada");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
        toast.error(`Error,  ${err.response.data.message}`);
      });
  };

  const handleAddSubCat = (e) => {
    setIsLoading(true);
    const newSubCategory = enterName(
      `Ingresa una nueva SubCategoría dentro de categoría ${categorySelected.name}`
    );
    if (newSubCategory == null) return;

    const payload = { name: newSubCategory, categoryId: categorySelected.id };
    _create(payload, "subcategory")
      .then((res) => {
        console.log(res);
        trigger("/category/all");
        setIsLoading(false);
        toast.success("subCategoría Creada");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
        toast.error(`Error,  ${err.response.data.message}`);
      });
  };

  const handleDeleteCategory = (e) => {
    const cid = e.target.dataset.cid;
    const _confirm = confirm(`Seguro que quieres borrar la categoría ${cid}`);

    _confirm === true &&
      _delete(cid, "/category/category")
        .then((res) => {
          toast.success("recurso eliminado");
          trigger("/category/all");
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(`Error! ${err.response.data.message}`);
        });
  };

  const handleDeleteSubCategory = (e) => {
    const scid = e.target.dataset.scid;
    const _confirm = confirm(`Seguro que quieres borrar la categoría ${scid}`);

    _confirm === true &&
      _delete(scid, "/category/subcategory")
        .then((res) => {
          toast.success("recurso eliminado");
          trigger("/category/all");
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(`Error! ${err.response.data.message}`);
        });
  };

  if (!data) return <div> ...Cargando </div>;
  if (error) return <div> Error al cargar las categorías </div>;

  return (
    <CategoriesStyled>
      <ListContainer>
        <h2>Categorías</h2>
        <small>click en una categoría para ver detalles</small>
        <ListItems>
          {categories.map((cat) => (
            <Item key={cat.id}>
              <div data-cid={Number(cat.id)} onClick={handleCategorySelector}>
                {cat.name}
              </div>
            </Item>
          ))}
        </ListItems>
        <AddItem>
          {isLoading ? (
            "Cargando"
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
            <SubCategoriesHeader>
              <h4>
                <small>Categoría: </small>
                {categorySelected.name}
              </h4>
              <div>
                Imagen:{" "}
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${categorySelected.imageUrl}`}
                />
              </div>
              <div>
                <Button
                  onClick={handleDeleteCategory}
                  data-cid={categorySelected.id}
                >
                  Eliminar Categoría {categorySelected.name}
                </Button>
              </div>
            </SubCategoriesHeader>
          </div>
        )}
        {categorySelected ? (
          <>
            <SubCategoryTableItems
              itemsList={categorySelected.SubCategories}
              updateHandler={handleUpdateSubCategory}
              deleteHandler={handleDeleteSubCategory}
            />
            <AddItem>
              {isLoading
                ? "Cargando"
                : categorySelected && (
                    <button onClick={handleAddSubCat}>Agregar</button>
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
