import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useSWR, { trigger } from "swr";
import axiosBase from "../../utils/axiosBase";
import Cookies from "js-cookie";
import CmsLayout from "../../components/layouts/CmsLayout";
import { Button } from "../../components/Button";
import { useAlert } from "react-alert";

const BannersList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em;
`;

const BannersListItem = styled.div`
  display: flex;
  flex-direction: row;

  img {
    width: 300px;
    margin-right: 10px;
  }
`;

const UploadFileForm = styled.section``;

const Banners = () => {
  const [banners, setBanners] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0); // progress bar
  const inputTitle = useRef();
  const { data } = useSWR("/utils/banners");
  const alert = useAlert();

  useEffect(() => {
    if (data) {
      setBanners(data.data);
    }
  }, [data]);

  const handleDeleteBanner = (bid) => {
    axiosBase
      .delete(`/utils/banner/${bid}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        // console.log(res);
        alert.success(`Banner eliminado `);
        trigger("/utils/banners");
      })
      .catch((err) => console.log(err.response));
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const title = inputTitle.current.value;
    setProgress(0);
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.set("title", title);
    formData.set("position", 1);
    formData.set("link", 1);
    formData.set("published ", 1);

    axiosBase({
      method: "post",
      url: `/utils/banner`,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      onUploadProgress: (ProgressEvent) => {
        let progress = Math.round(
          (ProgressEvent.loaded / ProgressEvent.total) * 100
        );
        setProgress(progress);
      },
    })
      .then((res) => {
        console.log(res);
        alert.success("Banner Cargado");
        trigger("/utils/banners");
      })
      .catch((err) => {
        console.log(err, err.response);
      });
  };
  return (
    <div>
      <h1>BANNERS</h1>
      <UploadFileForm>
        <h2>Cargar banner</h2>
        <button
          onClick={() => {
            setShowForm(false);
          }}
        >
          X
        </button>
        <form>
          <label>Titulo de la imagen</label>
          <input ref={inputTitle} type="text" name="title" required />
          <label>Banner</label>
          <input
            type="file"
            name="file"
            required
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button type="submit" onClick={uploadFile}>
            enviar
          </button>
        </form>
      </UploadFileForm>
      <div>
        {banners &&
          banners.map((e) => {
            return (
              <BannersList key={e.id}>
                <BannersListItem>
                  <img
                    src={
                      process.env.NEXT_PUBLIC_API_URL + e.imagePath ||
                      "images/logo.png"
                    }
                  />
                  <div>
                    <div>Id: {e.id}</div>
                    <div>Title*: {e.title}</div>
                    <div>Publicado: {e.published ? "si" : "no"}</div>
                    <Button>orden</Button>
                    <Button
                      onClick={() => {
                        handleDeleteBanner(e.id);
                      }}
                    >
                      Remover
                    </Button>
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
