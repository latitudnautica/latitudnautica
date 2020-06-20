import Link from "next/link";
import styled from "styled-components";

const ButtonCategory = styled.a`
  height: 25px;
  width: 50;
  cursor: pointer;
  margin: 10px;
`;

const categoryMenuProps = (props) => {
  const { categories, isClient } = props;

  return categories ? (
    <div className='catMenu'>
      {categories.map((category) => {
        return (
          <Link
            key={category.id}
            href={`/lista/user/${category.id}/${
              isClient ? "postsclient" : "posts"
            }`}
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
    </div>
  ) : (
    "menu error"
  );
};

export default categoryMenuProps;
