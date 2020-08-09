import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args)=> axios(...args).then(
  (res) => {
    return res;
  }
);

const CategoryMenu = () => {
  // const [users, setUsers] = useState();

  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>Cargando Categories</div>;

  return (
    <div className='catMenu'>
      {data.data.map((user) => {
        return (
          <div key={user.id}>
            <Link href={`/lista/user/${user.id}/posts`}>
              <a>{user.name}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryMenu;
