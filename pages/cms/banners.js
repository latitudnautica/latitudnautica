import { useState, useEffect } from "react";
import axios from "axios";
import CmsLayout from "../../components/layouts/CmsLayout";

const Banners = () => {
  const [banners, setBanners] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/utils/banners`)
        .then((res) => {
          setBanners(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  console.log(banners);

  return (
    <div>
      <h1>BANNERS</h1>
      {banners &&
        banners.map((e) => {
          return <div>Title: {e.title}</div>;
        })}
    </div>
  );
};

Banners.Layout = CmsLayout;
export default Banners;
