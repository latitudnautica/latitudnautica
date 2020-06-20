import { useState } from "react";
import MainLayout from "../../../../layouts/MainLayout";
import { useRouter } from "next/router";
import CategoryMenuProps from "../../../../components/categoryMenuProps";
import SideBarMenu from "../../../../components/SideBarMenu";
import styled from "styled-components";

const ListSection = styled.section`
  display: flex;
`;

const User = (props) => {
  const router = useRouter();
const subCategories = props.categories[router.query.id - 1].SubCategories;
  console.log(subCategories);
  
// const [catSelected, setCatSelected] = useState(true);

//   const handleSubMenu = (e) => {
//     const { id } = e.target.dataset;
//     setCatSelected(props.categories[id - 1]);
//   };

  return (
    <div>
      <CategoryMenuProps categories={props.categories} />
      <ListSection>
        <SideBarMenu subCategories={subCategories} />
        <div style={{ width: "100%" }}>
          {router.isFallback ? (
            <div>loading...</div>
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>UserId</th>
                  <th>Post Id</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {props.posts.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.userId}</td>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </ListSection>
    </div>
  );
};

User.Layout = MainLayout;

export default User;

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },   
      { params: { id: "5" } },   
      { params: { id: "6" } },   
      { params: { id: "7" } },   
      { params: { id: "8" } },   
      { params: { id: "9" } }   
    ],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: false
  };
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/user/${params.id}/posts`
  );

  const cat = await fetch(`http://localhost:5000/api/category/all`);

  const categories = await cat.json();
  const posts = await res.json();

  // Pass post data to the page via props
  return { props: { posts, categories } };
}
