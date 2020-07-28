import { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import CmsLayout from "../../components/layouts/CmsLayout";
import Button from "../../components/Button";
import UploadFileModal from "../../components/cms/UploadFileModal";

const BannersList = styled.div`
  display: flex;
  flex-direction: column;
`;
const BannersListItem = styled.div`
  display: flex;
  flex-direction: row;

  img {
    width: 300px;
  }
`;

const Banners = () => {
  const [banners, setBanners] = useState(false);
  const { data } = useSWR("/utils/banners");

  useEffect(() => {
    if (data) {
      setBanners(data.data);
    }
    console.log(banners);
  }, [data]);

 
  return (
    <div>
      <h1>BANNERS</h1>
      <UploadFileModal isOpen={true} />
      <div>
        {banners &&
          banners.map((e) => {
            return (
              <BannersList>
                <BannersListItem>
                  <img
                    src={
                      process.env.NEXT_PUBLIC_API_URL + e.imagePath ||
                      "images/logo.png"
                    }
                  />
                  <div>
                    <div>Title*: {e.title}</div>
                    <Button>orden</Button>
                  </div>
                </BannersListItem>
              </BannersList>
            );
          })}
      </div>
    </div>
  );
};

Banners.Layout = CmsLayout;
export default Banners;
