import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSWR, { trigger, mutate } from 'swr';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { PageTitleH1 } from '@/components/layouts/commonStyledComponents';
import axiosBase from '../../utils/axiosBase';
import CmsLayout from '../../components/layouts/CmsLayout';
import { Button } from '../../components/layouts/Button';

const BannersStyled = styled.main``;

const UploadFileForm = styled.section`
  margin: 2em auto;
  width: 70vw;
`;
const Form = styled.form`
  margin: 2em auto;
  display: flex;
  flex-direction: row;
  padding-left: 1em;

  input,
  button {
    max-width: 200px;
    margin: 1em;
  }
`;

const BannersList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 2em;
  justify-content: center;
`;

const BannersListItem = styled.div`
  background-color: #dcdcdc;
  margin: 1em;
  max-width: 350px;
  border-radius: 5px;
  img {
    width: 100%;
    margin-right: 10px;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress || 0}%;
  background-color: rgb(68, 212, 231);
  color: white;
  text-align: center;
  padding: 2px;
`;

const Banners = () => {
  const [banners, setBanners] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0); // progress bar
  const inputTitle = useRef();
  const { data } = useSWR('/utils/banners?nocache', { refreshInterval: 2000 });

  useEffect(() => {
    if (data) {
      setBanners(data.data);
    }
  }, [data]);

  const handleDeleteBanner = (bid) => {
    axiosBase
      .delete(`/utils/banner/${bid}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      .then((res) => {
        console.log(res);
        // const bannersCleaned = banners.filter(
        //   (item) => item.id != res.data.bannerId
        // );
        // setBanners(bannersCleaned || []);
        toast.success('Banner eliminado ');
        mutate('/utils/banners');
      })
      .catch((err) => console.log(err));
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    toast.info('cargando archivo');

    const title = inputTitle.current.value;
    setProgress(0);
    const formData = new FormData();
    formData.append('file', file);
    formData.set('title', title);
    formData.set('position', 1);
    formData.set('link', 1);
    formData.set('published ', 1);

    axiosBase({
      method: 'post',
      url: '/utils/banner',
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      onUploadProgress: (ProgressEvent) => {
        const progress = Math.round(
          (ProgressEvent.loaded / ProgressEvent.total) * 100,
        );
        setProgress(progress);
      },
    })
      .then((res) => {
        console.log(res);
        // const newBanner = res.data.data;

        // setBanners((ban) => {
        //   return [...ban, newBanner];
        // });

        toast.success('Banner Cargado');
        mutate('/utils/banners');
      })
      .catch((err) => {
        toast.error('Selecciona una imagen');
        console.log(err, err.response);
      });
  };
  return (
    <BannersStyled>
      <PageTitleH1>BANNERS</PageTitleH1>
      <UploadFileForm>
        <h2>Cargar banner</h2>
        <h4>
          IMPORTANTE: Medidas de las imágenes 1200 x 350 pixels
          <p>
            Para que las imágenes se muestren correctamente en las paginas y
            distintos dispositivos es importante respetar esas medidas.
          </p>
        </h4>
        <Form>
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
          <Button type="submit" onClick={uploadFile}>
            Subir
          </Button>
        </Form>
        <ProgressBarWrapper>
          {(progress > 0 || file != null) && (
            <ProgressBar progress={progress}>
              {progress}
              %
            </ProgressBar>
          )}
        </ProgressBarWrapper>
      </UploadFileForm>
      <BannersList>
        {banners
          && banners.map((e) => (
            <BannersListItem key={e.id}>
              <img
                src={
                    process.env.NEXT_PUBLIC_API_URL + e.imagePath
                    || 'images/logo.png'
                  }
              />
              <div>
                <div>
                  Id:
                  {e.id}
                </div>
                <div>
                  Titulo*:
                  {e.title}
                </div>
                <div>
                  Publicado:
                  {e.published ? 'si' : 'no'}
                </div>
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
          ))}
      </BannersList>
    </BannersStyled>
  );
};

Banners.Layout = CmsLayout;
export default Banners;
