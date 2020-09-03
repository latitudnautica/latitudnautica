import styled from 'styled-components';
import { Button } from '../layouts/Button';

const Table = styled.table`
  width: 100%;
  text-align: center;
  border: 1px solid gray;

  tr,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
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

    :hover {
      background-color: white;
      color: green;
      border: 1px solid blue;
    }
  }
`;

const SubCategoryTableItems = ({ itemsList, updateHandler, deleteHandler }) => (
  <Table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {itemsList
          && itemsList.map((subCat) => (
            <tr data-id={subCat.id} key={subCat.id}>
              <td>{subCat.id}</td>
              <td>
                {' '}
                {subCat.name}
              </td>
              <td>
                <Button data-id={subCat.id} onClick={updateHandler}>
                  Editar
                </Button>
                <Button data-scid={subCat.id} onClick={deleteHandler}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
    </tbody>
  </Table>
);

export default SubCategoryTableItems;
