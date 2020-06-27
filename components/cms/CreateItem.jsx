import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import axios from "axios";
import UploadFile from "./uploadFiles";
import ProductCard from '../ProductCard'

const CreateItemStyled = styled.div`
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
    max-width: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  /* flex-flow: 1; */
  /* flex-grow: 1; */
  flex-wrap: wrap;
  justify-content: space-between;
  vertical-align: middle;

  input,
  textarea {
    margin: 10px;
    height: 20px;
    padding: 10px;
    border: 1px solid green;
    border-radius: 5px;
  }
`;

export default function CreateItem() {
  const [prodCreated, setProdCreated] = useState();
  const [isProdCreated, setIsProdCreated] = useState(false);

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
                <FieldGroup>
                  <label>Selecciona la categoría</label>
                  <Field
                    type='number'
                    name='categoryId'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.categoryId}
                  />
                  {errors.categoryId && touched.categoryId && errors.categoryId}
                </FieldGroup>
                <FieldGroup>
                  <label>Selecciona la Sub Categoria</label>
                  <Field
                    type='number'
                    name='subCategoryId'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subCategoryId}
                  />
                  {errors.subCategoryId &&
                    touched.subCategoryId &&
                    errors.subCategoryId}
                </FieldGroup>
                <FieldGroup>
                  <label>Naombre del Producto</label>
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
                  <label>Precio en Dolares</label>
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
                  <label>Publicar</label>
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
                  <label>Selecciona la categoria</label>
                  <Field
                    type='number'
                    name='categoryId'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.categoryId}
                  />
                  {errors.categoryId && touched.categoryId && errors.categoryId}
                </FieldGroup>
                <FieldGroup>
                  <label>Promocion activa </label>
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
                  <label>Stock Diponible</label>
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
                  <label>Codigo del Producto</label>
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
                  <label>Coigo de promoción</label>
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
                  <label>Codigo SKU</label>
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
                  <label>Codigo UPC</label>
                  <Field
                    type='text'
                    name='upc'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.upc}
                  />
                  {errors.upc && touched.upc && errors.upc}
                </FieldGroup>
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

                <button type='submit' disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            </FormContainer>
          )}
        </Formik>
      )}
      {isProdCreated && prodCreated ? (
        <UploadFile prodId={prodCreated.data.id} />
      ) : (
        <h3>Carga un producto para subir una imagen</h3>
      )}
    </CreateItemStyled>
  );
}
