import styled from "styled-components";

const SideBarMenuStyled = styled.div`
  width: 100px;
  border: 1px solid red;
`;

const SubCategoryLink = styled.button`
  width: 100%;
  text-align: center;
  margin: 5px 0;
`;

const SideBarMenu = (props) => {
  const { subCategories } = props;
  console.log(props);

  return (
    <SideBarMenuStyled>
      {subCategories.length > 0 &&
        subCategories.map((item) => {
          return <SubCategoryLink key={item.id}>{item.name}</SubCategoryLink>;
        })}
    </SideBarMenuStyled>
  );
};

export default SideBarMenu;
