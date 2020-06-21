import styled from "styled-components";

const SideBarMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 50vh;
  border: 1px solid red;
`;

const SubCategoryLink = styled.button`
  text-align: center;
  margin: 5px;
`;

const SideBarMenu = (props) => {
  const { subCategories, catHandler } = props;

  return (
    <SideBarMenuStyled>
      {subCategories.length > 0 &&
        subCategories.map((subCat) => {
          return (
            <SubCategoryLink
              key={subCat.id}
              onClick={catHandler}
              data-cid={subCat.id}
            >
              {subCat.name}
            </SubCategoryLink>
          );
        })}
    </SideBarMenuStyled>
  );
};

export default SideBarMenu;
