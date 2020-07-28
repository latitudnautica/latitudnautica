import React, { useState } from "react";
import axiosBase from "../../lib/axiosBase";
import styled from "styled-components";
import Cookies from "js-cookie";
import Button from "../Button";
import Router from "next/router";

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
  const [uploadedFile, setUploadedFile] = useState({ name: "", path: "" });
  const [progress, setProgress] = useState(0); // progress bar

  const handleSelectedFile = (e) => {
    const file = e.target.files[0];
    console.log(file);

    try {
      if (file.size < 2097152) {
        //2mb max file size
        setSelectedFile(file);
        setProgress(0);
        setIsLoaded(false);
      } else {
        setIsError({
          message: "La imagen seleccionada es muy pesada. Max 2mb",
          status: 413
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFile = (e) => {
    e.preventDefault();

    setIsError(false);
    setProgress(0);
    setIsLoaded(false);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.set("prod_id", props.product.id);

    axios({
      method: "post",
      url: `/product/upload/image`,
      data: formData,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "content-type": "multipart/form-data"
      },
      onUploadProgress: (ProgressEvent) => {
        let progress = Math.round(
          (ProgressEvent.loaded / ProgressEvent.total) * 100
        );
        setProgress(progress);
      }
    })
      .then((res) => {
        // then print response status
        setIsLoaded(true);
        // setUploadedFile({ name: res.data.name, path: res.data.path });
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

  if (isError)
    return (
      <FileUploadStyled>
        <h3>error al subir la imagen</h3>
        <p>{isError.message}</p>
        <Button onClick={handelTryAgain}>Intentar de nuevo</Button>
      </FileUploadStyled>
    );

  return (
    <FileUploadStyled>
      <div>
        {selectedFile ? (
          <img src={URL.createObjectURL(selectedFile)} height='250px' />
        ) : (
          <p>Selecciona una imagen para cambiar la que tine el producto</p>
        )}
      </div>
      <FormContainer>
        <input type='file' name='file' onChange={handleSelectedFile} />

        {selectedFile == null ? (
          false
        ) : (
          <Button type='button' value='Cargar' onClick={handleUploadFile}>
            Cargar Imagen
          </Button>
        )}
        <ProgressBarWrapper>
          {(progress > 0 || selectedFile) && (
            <ProgressBar progress={progress}>{progress}%</ProgressBar>
          )}
        </ProgressBarWrapper>
      </FormContainer>
    </FileUploadStyled>
  );
}
