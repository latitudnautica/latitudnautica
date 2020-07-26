import styled from "styled-components";
import Link from "next/link";

const SideBarMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 50vh;
  border: 1px solid red;
`;

const Button = styled.button`
  box-sizing: border-box;
  cursor: pointer;
  background-color: #08a0b9;
  text-transform: uppercase;
  color: white;
  padding: 10px;
  border: 1px solid #08a0b9;
  transition: all 200ms ease-in;
  margin: 3px 5px;
  border-radius: 2.5px;

  :hover {
    background-color: white;
    color: #08a0b9;
    border: 1px solid #08a0b9;
  }
`;

const SideBarMenu = (props) => {
  const { categorySelected } = props;
  return (
    <SideBarMenuStyled>
      {categorySelected && categorySelected.SubCategories.length > 0 ? (
        categorySelected.SubCategories.map((sCat) => {
          return (
            <Link
              key={sCat.id}
              href={`/productos/[category]?cid=${categorySelected.id}&scid=${sCat.id}&scname=${sCat.name}`}
              as={`/productos/${categorySelected.name}?cid=${categorySelected.id}&productos?scid=${sCat.id}&scname=${sCat.name}`}
            >
              <Button key={sCat.id}>{sCat.name}</Button>
            </Link>
          );
        })
      ) : (
        <div>No hay sub categorías</div>
      )}
    </SideBarMenuStyled>
  );
};

export default SideBarMenu;
