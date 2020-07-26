import styled from "styled-components";

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 20%;
  }
`;
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
const CategoryTableItems = ({ itemsList, action }) => {
  return (
    <div>
      {/* <ListHeader>
        <h3>
          {itemsList.name.toUpperCase()}
          <br /> <small> / Sub Categorías</small>
        </h3>
        <img
          src={itemsList.imageUrl ? itemsList.imageUrl : "/images/test.png"}
        />
      </ListHeader> */}
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {itemsList &&
            itemsList.map((subCat) => (
              <tr data-id={subCat.id} key={subCat.id}>
                <td>{subCat.id}</td>
                <td> {subCat.name}</td>
                <td>
                  <button data-id={subCat.id} onClick={action}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryTableItems;
