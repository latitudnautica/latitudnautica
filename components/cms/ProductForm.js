import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { positions, useAlert } from "react-alert";
import Button from "../Button";

const FormContainer = styled.div`
  width: 90%;
  form {
    width: 100%;
    display: grid;
    background-color: whitesmoke;
    grid-template-columns: 1fr 1fr 1fr;
    /* border: 1px solid red; */

    @media (max-width: 600px) {
      grid-template-rows: 1fr 1fr 1fr;
      background-color: white;
    }
  }
`;

const FormGroupContainer = styled.div`
  /* border: 1px solid blue; */
  /* width: 100%; */
  padding: 25px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: left;

  label {
    max-width: 150px;
    display: contents;
  }
  input {
    margin: 10px;
    height: 20px;
    padding: 15px;
    border: 1px solid green;
    border-radius: 5px;
  }
  textarea {
    width: 100%;
    height: 300px;
  }
  select {
    width: 100%;
    margin: 10px;
    height: 25px;
  }
`;

const FieldError = styled.span`
  color: red;
`;

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

const ProductForm = ({ product }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/category/all`)
        .then((res) => {
          setCategories(res.data);
          return res.data;
        })
        .then((categories) => {
          const subCat = categories.filter(
            (cat) => cat.id == product.CategoryId
          );
          setSubCategories(subCat[0].SubCategories);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [isEdited]);

  const handleSubmit = (values) => {
    const data = values;
    // data.visible = data.visible ? 1 : 0; //workaround FixThis
    data.id = product.id;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/product/`;
    axios
      .put(apiUrl, values, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      })
      .then((data) => {
        setIsEdited(true);
        alert.success(`${data.data.productData.name} modificado con éxito.`);
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = {
            status: err.response.status,
            data: err.response.data
          };
          setErrorMessage(errMessage);
        }

        console.log(err);
      });
  };

  const handleCategorySelector = (e) => {
    const id = e.target.value;
    const subCat = categories.filter((c) => c.id == id);
    setSubCategories(subCat[0].SubCategories);
  };

  console.error("error message:", errorMessage);
  if (errorMessage.status == 406) {
    alert.error(
      `Ya existe un producto con ese nombre. Modifica el Nombre del producto e intenta de nuevo. [ ${errorMessage.data.message} ]`
    );
  }
  if (errorMessage.status == 401) {
    alert.error(
      `Debes Iniciar sesión nuevamente refresca la pagina presionando F5`
    );
  }

  if (isEdited) {
    return <div>Producto Editado Exitosamente.</div>;
  }
  return (
    <Formik
      validateOnChange
      // validationSchema={createProductSchema}
      initialValues={{
        categoryId: Number(product.categoryId),
        subCategoryId: Number(product.subCategoryId),
        name: product.name,
        visible: product.visible == 1 ? true : false
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroupContainer>
              <FieldGroup>
                <label>Categoría</label>
                <Select
                  as='select'
                  name='categoryId'
                  onChange={handleChange}
                  onClick={handleCategorySelector}
                  onBlur={handleBlur}
                  value={values.categoryId}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={Number(cat.id)}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
                {errors.categoryId && touched.categoryId && errors.categoryId}
              </FieldGroup>
              <FieldGroup>
                <label>Sub Categoría</label>
                <Select
                  as='select'
                  name='subCategoryId'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subCategoryId}
                  required
                >
                  {subCategories.map((scat) => (
                    <option key={scat.id} value={Number(scat.id)}>
                      {scat.name}
                    </option>
                  ))}
                </Select>

                {errors.subCategoryId &&
                  touched.subCategoryId &&
                  errors.subCategoryId}
              </FieldGroup>
              <FieldGroup>
                <label>Nombre</label>
                <Field
                  type='text'
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <FieldError>{errors.name}</FieldError>
                ) : null}
              </FieldGroup>
              <FieldGroup>
                <label>Precio</label>
                <Field
                  type='number'
                  name='price'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                />
                {errors.price && touched.price && errors.price}
              </FieldGroup>
              <FieldGroup>
                <label>Precio Dolares</label>
                <Field
                  type='number'
                  name='priceDolar'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.priceDolar}
                />
                {errors.priceDolar && touched.priceDolar && errors.priceDolar}
              </FieldGroup>
              <FieldGroup>
                <label>IVA</label>
                <Field
                  type='number'
                  name='tasasIVA'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tasasIVA}
                />
                {errors.tasasIVA && touched.tasasIVA && errors.tasasIVA}
              </FieldGroup>
              <FieldGroup>
                <label>Stock</label>
                <Field
                  type='number'
                  name='stock'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stock}
                />
                {errors.stock && touched.stock && errors.stock}
              </FieldGroup>
            </FormGroupContainer>
            <FormGroupContainer>
              <FieldGroup>
                <label>Código</label>
                <Field
                  type='text'
                  name='codeArticle'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.codeArticle}
                />
                {errors.codeArticle &&
                  touched.codeArticle &&
                  errors.codeArticle}
              </FieldGroup>
              <FieldGroup>
                <label>Promoción</label>
                <Field
                  type='text'
                  name='promoActive'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.promoActive}
                />
                {errors.promoActive &&
                  touched.promoActive &&
                  errors.promoActive}
              </FieldGroup>
              <FieldGroup>
                <label>Código promoción</label>
                <Field
                  type='text'
                  name='codePromo'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.codePromo}
                />
                {errors.codePromo && touched.codePromo && errors.codePromo}
              </FieldGroup>
              <FieldGroup>
                <label>Código SKU</label>
                <Field
                  type='text'
                  name='sku'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.sku}
                />
                {errors.sku && touched.sku && errors.sku}
              </FieldGroup>
              <FieldGroup>
                <label>Código UPC</label>
                <Field
                  type='text'
                  name='upc'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.upc}
                />
                {errors.upc && touched.upc && errors.upc}
              </FieldGroup>
            </FormGroupContainer>
            <FormGroupContainer>
              <FieldGroup>
                <label>Descripción</label>
                <textarea
                  type='textarea'
                  name='description'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {errors.description &&
                  touched.description &&
                  errors.description}
              </FieldGroup>
              <FieldGroup>
                <label>Visible</label>
                <Field name={"visible"}>
                  {({ field }) => (
                    <input
                      type='checkbox'
                      checked={values.visible}
                      {...field}
                    />
                  )}
                </Field>
              </FieldGroup>
              <FieldGroup>
                <p>
                  Después de cargar el producto podrás cargar la imagen del
                  producto.
                </p>
                <Button type='submit'>Enviar</Button>
                <Button type='reset' disabled={isSubmitting}>
                  Reset
                </Button>
              </FieldGroup>
            </FormGroupContainer>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default ProductForm;
