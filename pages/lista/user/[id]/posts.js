import MainLayout from "../../../../layouts/MainLayout";
import { useRouter } from "next/router";
import CategoryMenuProps from "../../../../components/categoryMenuProps";

const User = (props) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <CategoryMenuProps categories={props.categories} />
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
                  <tr>
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
      { params: { id: "9" } },
      { params: { id: "10" } }
    ],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true
  };
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/user/${params.id}/posts`
  );

  const cat = await fetch(`https://jsonplaceholder.typicode.com/users`);

  const categories = await cat.json();
  const posts = await res.json();

  // Pass post data to the page via props
  return { props: { posts, categories } };
}
