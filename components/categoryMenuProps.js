import Link from "next/link";
import styled from "styled-components";

const MenuCategories = styled.nav`
  justify-content: center;
  display: flex;
`;

const ButtonCategory = styled.a`
  height: 25px;
  /* width: 100px; */
  cursor: pointer;
  margin: 10px;
  text-transform: capitalize;

  :hover {
    font-weight: 700;
  }
`;

const categoryMenuProps = (props) => {
  const { categories } = props;

  return categories ? (
    <MenuCategories>
      {categories.map((category) => {
        return (
          <Link
            key={category.id}
            href={`/lista/${category.name}/${category.id}/productos`}
          >
            <ButtonCategory
              key={category.id}
              data-id={category.id}
              onMouseEnter={props.handleSubMenu}
            >
              {category.name}
            </ButtonCategory>
          </Link>
        );
      })}
    </MenuCategories>
  ) : (
    "menu error"
  );
};

export default categoryMenuProps;
