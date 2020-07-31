import styled from "styled-components";
import Link from "next/link";
import Button from "./Button";

const SidebarMenuProductsStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 50vh;
  padding: 10px;
  margin-left: 5px;
  background-color: ${({ theme }) => theme.colors.lightBlack};
  box-shadow: ${({ theme }) => theme.details.boxShadow};
`;

const ButtonExtended = styled(Button)`
  margin: 2px 0;
`;

const SidebarMenuProducts = (props) => {
  const { categorySelected } = props;
  return (
    <SidebarMenuProductsStyled>
      {categorySelected && categorySelected.SubCategories.length > 0 ? (
        categorySelected.SubCategories.map((sCat) => {
          return (
            <Link
              key={sCat.id}
              href={`/productos/[category]?cid=${categorySelected.id}&scid=${sCat.id}&scname=${sCat.name}`}
              as={`/productos/${categorySelected.name}?cid=${categorySelected.id}&productos?scid=${sCat.id}&scname=${sCat.name}`}
              passHref
            >
              <ButtonExtended as='a'>{sCat.name}</ButtonExtended>
            </Link>
          );
        })
      ) : (
        <div>No hay sub categorías</div>
      )}
    </SidebarMenuProductsStyled>
  );
};

export default SidebarMenuProducts;
