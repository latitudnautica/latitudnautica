import * as Yup from 'yup';

const createProductSchema = Yup.object().shape({
  categoryId: Yup.number().required('Campo Requerido'),
  subCategoryId: Yup.number().required('Required'),
  name: Yup.string()
    .min(1, ' 1 caracter mínimo')
    .max(150, '150 caracteres máximo')
    .required('Required'),
  description: Yup.string(),
  price: Yup.number(),
  priceDolar: Yup.number(),
  stock: Yup.number(),
  tasasIVA: Yup.number(),
  codeArticle: Yup.string(),
  upc: Yup.string(),
  codePromo: Yup.string(),
  promoActive: Yup.string(),
  sku: Yup.string(),
  serialNumber: Yup.string(),
});

export default createProductSchema;
