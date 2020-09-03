import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';
import UploadFile from './uploadFiles';
import ProductCard from '../ProductCard';
import createProductSchema from '../../schemas/crateProd.schema';
import getCategories from '../../utils/getCategories';

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
const UploadFileContainer = styled.div`
  width: 100%;
  display: grid;
  background-color: whitesmoke;
  grid-template-columns: 1fr 1fr auto;
  /* border: 1px solid red; */
  img {
    width: 100%;
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
  button {
    box-sizing: border-box;
    cursor: pointer;
    background-color: blue;
    text-transform: uppercase;
    color: white;
    padding: 10px;
    border: 1px solid blue;
    transition: all 200ms ease-in;
    margin: 10px;

    :hover {
      background-color: white;
      color: green;
      border: 1px solid blue;
    }
  }
`;
const FieldError = styled.span`
  color: red;
`;

const ProductCardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

export default function CreateItem(props) {
  const [prodCreated, setProdCreated] = useState();
  const [isProdCreated, setIsProdCreated] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState(false);

  useEffect(() => {
    const categoryList = getCategories();
    categoryList.then((data) => {
      console.log(data);
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    const id = 1;
    if (categories) {
      const subCat = categories.filter((c) => c.id == id);
      setSubCategories(subCat[0].SubCategories);
    }
  }, [categories]);

  const handleSubmit = (values) => {
    console.log(values);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/product/create/`;
    axios
      .post(apiUrl, values, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
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
      <Formik
        validateOnChange
        validationSchema={createProductSchema}
        initialValues={{
          categoryId: 1,
          name: 'testing image uploading',
          visible: true,
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
          isSubmitting,
          isValidating,
          /* and other goodies */
        }) => (
          <FormContainer>
            <h3>Formulario para cargar productos</h3>
            {!isProdCreated && (
              <Form onSubmit={handleSubmit}>
                <FormGroupContainer>
                  <FieldGroup>
                    <label>Categoría</label>
                    <Field
                      as="select"
                      name="categoryId"
                      onChange={handleChange}
                      onClick={handleCategorySelector}
                      onBlur={handleBlur}
                      value={values.categoryId}
                      required
                    >
                      {categories
                        && categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </Field>
                    {errors.categoryId
                      && touched.categoryId
                      && errors.categoryId}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Sub Categoría</label>
                    <Field
                      as="select"
                      name="subCategoryId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subCategoryId}
                      required
                    >
                      {subCategories
                        && subCategories.map((scat) => (
                          <option key={scat.id} value={scat.id}>
                            {scat.name}
                          </option>
                        ))}
                    </Field>

                    {errors.subCategoryId
                      && touched.subCategoryId
                      && errors.subCategoryId}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Nombre</label>
                    <Field
                      type="text"
                      name="name"
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
                      type="number"
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                    />
                    {errors.price && touched.price && errors.price}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Precio Dolares</label>
                    <Field
                      type="number"
                      name="priceDolar"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.priceDolar}
                    />
                    {errors.priceDolar
                      && touched.priceDolar
                      && errors.priceDolar}
                  </FieldGroup>
                  <FieldGroup>
                    <label>IVA</label>
                    <Field
                      type="number"
                      name="tasasIVA"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tasasIVA}
                    />
                    {errors.tasasIVA && touched.tasasIVA && errors.tasasIVA}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Stock</label>
                    <Field
                      type="number"
                      name="stock"
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
                      type="text"
                      name="codeArticle"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.codeArticle}
                    />
                    {errors.codeArticle
                      && touched.codeArticle
                      && errors.codeArticle}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Promoción</label>
                    <Field
                      type="text"
                      name="promoActive"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.promoActive}
                    />
                    {errors.promoActive
                      && touched.promoActive
                      && errors.promoActive}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Código promoción</label>
                    <Field
                      type="text"
                      name="codePromo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.codePromo}
                    />
                    {errors.codePromo && touched.codePromo && errors.codePromo}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Código SKU</label>
                    <Field
                      type="text"
                      name="sku"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sku}
                    />
                    {errors.sku && touched.sku && errors.sku}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Código UPC</label>
                    <Field
                      type="text"
                      name="upc"
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
                      type="textarea"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    {errors.description
                      && touched.description
                      && errors.description}
                  </FieldGroup>
                  <FieldGroup>
                    <label>Visible</label>
                    <Field name="visible">
                      {({ field }) => (
                        <input
                          type="checkbox"
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
                    <button type="submit" disabled={isSubmitting}>
                      Cargar Producto
                    </button>
                    <button type="reset" disabled={isSubmitting}>
                      Reset
                    </button>
                  </FieldGroup>
                </FormGroupContainer>
              </Form>
            )}

            {isProdCreated && (
              <UploadFileContainer>
                <FormGroupContainer>
                  <UploadFile prodId={prodCreated.data.id} />
                  <button
                    onClick={() => {
                      setIsProdCreated(false);
                    }}
                  >
                    <a>No cargar imagen</a>
                  </button>
                </FormGroupContainer>
                <FormGroupContainer style={{ textAlign: 'center' }}>
                  <h4>Ejemplo del producto creado</h4>
                  <p>Selecciona una imagen para este producto</p>
                  <ProductCardContainer>
                    <ProductCard
                      item={prodCreated.data}
                      style={{ margin: 'auto' }}
                    />
                    <Link href={`/cms/editar_producto/${prodCreated.data.id}`}>
                      <a>Editar</a>
                    </Link>
                  </ProductCardContainer>
                </FormGroupContainer>
              </UploadFileContainer>
            )}
          </FormContainer>
        )}
      </Formik>
    </CreateItemStyled>
  );
}
