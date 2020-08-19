import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import axiosbase from "utils/axiosBase";
import Cookies from "js-cookie";
import { useCategories } from "../../context/CategoriesProvider";
import { Button } from "../layouts/Button";
import { toast } from "react-toastify";

const formatProdToEdit = (prod) => {
  return {
    SubCategoryId: prod.SubCategoryId || undefined,
    categoryId: prod.categoryId || undefined,
    codeArticle: prod.codeArticle || undefined,
    codePromo: prod.codePromo || undefined,
    description: prod.description || undefined,
    descriptionGroup: prod.descriptionGroup || undefined,
    brand: prod.brand || undefined,
    id: prod.id || undefined,
    imageUrl: prod.imageUrl || undefined,
    name: prod.name || undefined,
    price: prod.price || undefined,
    priceDolar: prod.priceDolar || undefined,
    promoActive: prod.promoActive || undefined,
    serialNumber: prod.serialNumber || undefined,
    sku: prod.sku || undefined,
    stock: prod.stock || undefined,
    subCategoryId: prod.subCategoryId || undefined,
    tasaIVA: prod.tasaIVA || undefined,
    upc: prod.upc || undefined,
    visible: prod.visible || undefined,
  };
};

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

const ProductForm = ({ product, isEdit, triggerData }) => {
  const [isEdited, setIsEdited] = useState(false);
  const { categories } = useCategories();

  const [subCategories, setSubCategories] = useState([]);

  const handleCategorySelector = (e) => {
    const id = e.target.value;
    if (id != 0) {
      const subCat = categories.filter((c) => c.id == id);
      setSubCategories(subCat[0].SubCategories);
    } else {
      return;
    }
  };

  const handleSubmit = (values) => {
    toast.info("Cargando Producto");
    try {
      const request = async () => {
        if (!isEdit) {
          return await axiosbase.post("/product", values, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          });
        } else {
          const data = values;
          data.id = product.id;

          return await axiosbase.put("/product", data, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          });
        }
      };

      request()
        .then((data) => {
          setIsEdited(true);
          triggerData(true);

          toast.success(
            `El producto ${data.data.productData.name} ${
              isEdit ? "editado" : "creado"
            } con éxito.`
          );
        })
        .catch((err) => {
          if (err.response) {
            const errMessage = {
              status: err.response.status,
              data: err.response.data,
            };

            if (errMessage.status == 406) {
              toast.error(
                `Algo no funciono como se esperaba... [ ${errMessage.data.message} ]`
              );
            }
            if (errMessage.status == 401) {
              toast.error(
                `Debes Iniciar sesión nuevamente, recarga la pagina presionando F5`
              );
            }
          }
        });
    } catch (error) {
      toast.error(`Algo no funciono como se esperaba...`);
      console.log(error);
    }
  };
  if (isEdited) return <div>Producto Editado</div>;
  return (
    <Formik
      validateOnChange
      // validationSchema={createProductSchema}
      initialValues={isEdit ? formatProdToEdit(product) : {}}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(true);
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
      }) => (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroupContainer>
              <FieldGroup>
                <label>Categoría</label>
                <Select
                  as="select"
                  name="categoryId"
                  onChange={handleChange}
                  onClick={handleCategorySelector}
                  onBlur={handleBlur}
                  value={values.categoryId}
                  required
                >
                  <option value={0}>------------</option>
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
                  as="select"
                  name="subCategoryId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subCategoryId}
                  required
                >
                  <option value={false}>------------</option>
                  {subCategories.length > 0 &&
                    subCategories.map((scat) => (
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
                <label>Marca</label>
                <Field
                  type="text"
                  name="brand"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.brand}
                />
                {errors.price && touched.price && errors.price}
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
                {errors.priceDolar && touched.priceDolar && errors.priceDolar}
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
                {errors.codeArticle &&
                  touched.codeArticle &&
                  errors.codeArticle}
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
                {errors.promoActive &&
                  touched.promoActive &&
                  errors.promoActive}
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
                {errors.description &&
                  touched.description &&
                  errors.description}
              </FieldGroup>
              <FieldGroup>
                <label>Visible</label>
                <Field name={"visible"}>
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
                  producto en editar producto. Si no cargas una imagen se
                  mostrara una imagen base.
                </p>
                <Button type="submit" disabled={isSubmitting}>
                  Enviar
                </Button>
                <Button type="reset" disabled={isSubmitting}>
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
