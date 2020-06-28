import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import axios from "axios";
import UploadFile from "./uploadFiles";
import ProductCard from "../ProductCard";

const CreateItemStyled = styled.div`
  font-family: "Roboto", sans-serif;
  width: 100%;
  margin-top: 25px;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

const FormContainer = styled.div`
  form {
    width: 100%;
    /* max-width: 75%; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: 1px solid red;
  }
`;
const UploadFileContainer = styled.div`
  display: block;
`;
const FormGroupContainer = styled.div`
  border: 1px solid blue;
  padding: 25px;
`;

const FieldGroup = styled.div`
  display: flex;
  /* flex-flow: 1; */
  /* flex-grow: 1; */
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  label {
    max-width: 150px;
    display: contents;
  }
  input {
    margin: 10px;
    height: 15px;
    padding: 10px;
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

export default function CreateItem(props) {
  const [prodCreated, setProdCreated] = useState();
  const [isProdCreated, setIsProdCreated] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const { categories } = props;

  const handleSubmit = (values) => {
    // console.log(values);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/product/create/`;
    axios
      .post(apiUrl, values)
      .then((data) => {
        setProdCreated(data);
        setIsProdCreated(true);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setIsProdCreated(false);
      });

    // error ? console.log(error) : console.log(data);
  };

  const handleCategorySelector = (e) => {
    const id = e.target.value;
    const subCat = categories.filter((c) => c.id == id);
    setSubCategories(subCat[0].SubCategories);
  };

  return (
    <CreateItemStyled>
      {isProdCreated && prodCreated ? (
        <ProductCard item={prodCreated.data} />
      ) : (
        <Formik
          initialValues={{
            categoryId: 1,
            subCategoryId: 1,
            name: "Test de Producto",
            description: "aksjfhd askjdh asdjlh",
            price: 34,
            codeArticle: "qawer",
            codePromo: "qwer",
            priceDolar: 4,
            promoActive: "24wqer",
            sku: "qwer",
            serialNumber: null,
            stock: 4,
            tasasIVA: 21,
            upc: "qwer"
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Este valor es requerido";
            }
            //  else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.name)
            // ) {
            //   errors.email = "Invalid email address";
            // }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
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
            /* and other goodies */
          }) => (
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <FormGroupContainer>
                  <FieldGroup>
                    <label>Categoría</label>
                    <select
                      name='categoryId'
                      onChange={handleChange}
                      onClick={handleCategorySelector}
                      onBlur={handleBlur}
                      value={values.categoryId}
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId &&
                      touched.categoryId &&
                      errors.categoryId}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Sub Categoría</label>
                    <select
                      name='subCategoryId'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subCategoryId}
                      required
                    >
                      <option key='a5s2' value={null}>
                        varios
                      </option>
                      {subCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
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
                    {errors.name && touched.name && errors.name}
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
                    {errors.priceDolar &&
                      touched.priceDolar &&
                      errors.priceDolar}
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
                    <label>Visible</label>
                    <Field
                      type='checkbox'
                      name='visible'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.visible}
                    />
                    {errors.visible && touched.visible && errors.visible}
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
                </FormGroupContainer>

                <button type='submit' disabled={isSubmitting}>
                  Cargar Producto
                </button>
              </Form>
            </FormContainer>
          )}
        </Formik>
      )}

      <UploadFileContainer>
        {isProdCreated && prodCreated ? (
          <UploadFile prodId={prodCreated.data.id} />
        ) : (
          <h3>Carga un producto para subir una imagen</h3>
        )}
      </UploadFileContainer>
    </CreateItemStyled>
  );
}
