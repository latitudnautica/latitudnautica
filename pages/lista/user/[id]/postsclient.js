import MainLayout from "../../../../layouts/MainLayout";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import CategoryMenuProps from "../../../../components/categoryMenuProps";

const fetcher = (...args) =>
  axios(...args).then((res) => {
    return res;
  });

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const url = `https://jsonplaceholder.typicode.com/user/${id}/posts`;

  const { data: categories, error: catError } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  const { data, error } = useSWR(url, fetcher);

  console.log(categories);
  console.log("carError", catError);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>Cargando Products</div>;

  return (
    <div>
      {<CategoryMenuProps isClient={true} categories={categories.data} />}
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tr>
            <th>UserId</th>
            <th>Post Id</th>
            <th>Title</th>
          </tr>
          <tbody>
            {data.data.map((item) => {
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
      </div>
    </div>
  );
};

User.Layout = MainLayout;

export default User;
