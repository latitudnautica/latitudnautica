import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useSWR, { trigger, mutate } from 'swr';
import { toast } from 'react-toastify';
import { GoTrashcan } from 'react-icons/go';
import { _delete, _create, _update } from '@/utils/api/services';
import CmsLayout from '../../components/layouts/CmsLayout';
import SubCategoryTableItems from '../../components/cms/SubCategoryTableItems';
import { Button } from '../../components/layouts/Button';

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

const SubCategoriesHeader = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  div {
    cursor: pointer;
    text-transform: uppercase;
    margin: 0.3em;

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
`;

const Categories = (props) => {
  // const [lastDataAdded, setLastDataAdded] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR('/category/all?nocache');
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
    const { cid } = e.target.dataset;
    if (cid != 0) {
      setCategoryId(cid);
    } else {
      setCategoryId(null);
    }
  };

  const handleUpdateSubCategory = (e) => {
    const subCatId = e.target.dataset.id;
    const newName = enterName('Ingresa el nuevo nombre ');

    _update(subCatId, newName, '/category/subcategory')
      .then((res) => {
        toast.success('categoría Actualizada');
        setIsLoading(false);
        trigger('/category/all');
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
        toast.error(
          `Algo no funciono como se esperaba... [ ${err.response.data.message} ]`,
        );
      });
  };

  const enterName = (text) => {
    const valueEntered = prompt(text);
    if (valueEntered == '' || valueEntered === null) {
      console.log('prompt canceled');
      setIsLoading(false);
      return null;
    }
    if (valueEntered.match(/[a-z0-9.,_\-\s\/]/)) {
      return valueEntered.toLowerCase();
    }
    setIsLoading(false);
    toast(
      `${valueEntered} No esta permitido, Solo se permiten letras, numero y Comas. No se permiten puntos`,
    );
    return null;
  };

  const handleAddCat = (e) => {
    setIsLoading(true);
    const newCategory = enterName('Ingresa una nueva Categoría');
    if (newCategory == null) return;
    const payload = { name: newCategory.toLowerCase() };

    _create(payload, 'category')
      .then((res) => {
        console.log(res);
        trigger('/category/all?nocache');
        setIsLoading(false);
        toast.success('Categoría Creada');
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
      `Ingresa una nueva SubCategoría dentro de categoría ${categorySelected.name}`,
    );
    if (newSubCategory == null) return;

    const payload = { name: newSubCategory, categoryId: categorySelected.id };
    _create(payload, 'subcategory')
      .then((res) => {
        console.log(res);
        trigger('/category/all?nocache');
        setIsLoading(false);
        toast.success('subCategoría Creada');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
        toast.error(`Error,  ${err.response.data.message}`);
      });
  };

  const handleDeleteCategory = (e) => {
    const { cid } = e.target.dataset;

    // check if category is empty to be deleted
    const categoryCanBeDeleted = !(categorySelected.id == cid && categorySelected.SubCategories.length > 0);

    if (!categoryCanBeDeleted) {
      toast.info(
        'Debes eliminar todas las Sub Categorías antes de poder eliminar la categoría',
      );
      return;
    }
    const _confirm = confirm(`Seguro que quieres borrar la categoría ${cid}`);

    _confirm === true
      && categoryCanBeDeleted
      && _delete(cid, '/category/category')
        .then((res) => {
          toast.success('recurso eliminado');
          trigger('/category/all?nocache');
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(`Error! ${err.response.data.message}`);
        });
  };

  const handleDeleteSubCategory = (e) => {
    const { scid } = e.target.dataset;
    const _confirm = confirm(`Seguro que quieres borrar la categoría ${scid}`);

    _confirm === true
      && _delete(scid, '/category/subcategory')
        .then((res) => {
          toast.success('recurso eliminado');
          trigger('/category/all?nocache');
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
            'Cargando'
          ) : (
            <Button onClick={handleAddCat}>Agregar Categoría</Button>
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
              <div>
                <h1>{categorySelected.name}</h1>
              </div>
              <div>
                <Button
                  onClick={handleDeleteCategory}
                  data-cid={categorySelected.id}
                >
                  <GoTrashcan />
                  Eliminar Categoría
                  {' '}
                  {categorySelected.name}
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
                ? 'Cargando'
                : categorySelected && (
                <Button onClick={handleAddSubCat}>Agregar</Button>
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
