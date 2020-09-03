import React, { useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Button } from '../layouts/Button';
import axiosBase from '../../utils/axiosBase';

const FileUploadStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 300px;
`;

const FormContainer = styled.form`
  input {
    max-width: 250px;
  }
`;
const ProgressBarWrapper = styled.div`
  width: 100%;
  border: 1px solid red;
`;
const ProgressBar = styled.div`
  width: ${(props) => props.progress || 0}%;
  background-color: rgb(68, 212, 231);
  color: white;
  text-align: center;
  padding: 2px;
`;

export default function UploadFiles(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0); // progress bar
  const { product, triggerData } = props;

  const handleSelectedFile = (e) => {
    const file = e.target.files[0];

    if (file.size < 2097152) {
      // 2mb max file size
      setSelectedFile(file);
      setProgress(0);
      // setIsLoaded(false);
    } else {
      toast.error('La imagen seleccionada es muy pesada. Max 2mb');
      setIsError({
        message: 'La imagen seleccionada es muy pesada. Max 2mb',
        status: 413,
      });
    }
  };

  const handleUploadFile = (e) => {
    e.preventDefault();

    setIsError(false);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.set('prod_id', product.id);

    axiosBase({
      method: 'post',
      url: '/product/upload/image',
      data: formData,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'content-type': 'multipart/form-data',
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

        triggerData(true);
        toast.success('Imagen cargada exitosamente');
      })
      .catch((err) => {
        setIsError(err.response);
        console.log(err, err.response);
      });
  };

  const handelTryAgain = () => {
    setIsError(false);
    // setSelectedFile(null);
    setProgress(0);
    setIsLoaded(false);
  };

  if (isError) {
    return (
      <FileUploadStyled>
        <h3>error al subir la imagen</h3>
        <p>{isError.message}</p>
        <Button onClick={handelTryAgain}>Intentar de nuevo</Button>
      </FileUploadStyled>
    );
  }

  return (
    <FileUploadStyled>
      <div>
        {selectedFile ? (
          <img src={URL.createObjectURL(selectedFile)} height="250px" />
        ) : (
          <p>Selecciona una imagen para cambiar la que tine el producto</p>
        )}
      </div>
      <FormContainer>
        <input type="file" name="file" onChange={handleSelectedFile} />

        {selectedFile == null ? (
          false
        ) : (
          <Button type="button" value="Cargar" onClick={handleUploadFile}>
            Cargar Imagen
          </Button>
        )}
        <ProgressBarWrapper>
          {(progress > 0 || selectedFile) && (
            <ProgressBar progress={progress}>
              {progress}
              %
            </ProgressBar>
          )}
        </ProgressBarWrapper>
      </FormContainer>
    </FileUploadStyled>
  );
}
