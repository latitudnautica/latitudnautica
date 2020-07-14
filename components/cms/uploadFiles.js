import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";


const ProgressBar = styled.div`
  width: ${(props) => props.progress || 0}%;
  height: 1rem;
  background-color: rgb(68, 212, 231);
  color: white;
  padding: 2px;
`;

const IMG = styled.img`
  width: 50%;
  transition: 1s;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
`;

const FormContainer = styled.div`
  width: 90%;
  form {
    display: flex;
    flex-direction: column;

    input {
      margin: 20px;
    }
  }
`;

export default function UploadFiles(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({ name: "", path: "" });
  const [progress, setProgress] = useState(0); // progress bar
  console.log(uploadedFile);
  console.log(progress);
  console.log(isLoaded);

  const handleSelectedFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setProgress(0);
    setIsLoaded(false);
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    setIsError(false);
    setProgress(0);
    setIsLoaded(false);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("prod_id", props.prodId);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/upload/image`,
        data,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          onUploadProgress: (ProgressEvent) => {
            let progress = Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            );
            setProgress(progress);
          }
        }
      )
      .then((res) => {
        // then print response status
        setIsLoaded(true);
        setUploadedFile({ name: res.data.name, path: res.data.path });
      })
      .catch((err) => {
        setIsError(err);
        console.log(err, err.message);
      });
  };
  const handelTryAgain = () => {
    setIsError(false);
    setSelectedFile(null);
    setProgress(0);
    setIsLoaded(false);
  };

  if (isError)
    return (
      <div>
        <h2>Cargar Imagen</h2>
        <h3>error al subir la imagen</h3>
        <button onClick={handelTryAgain}>Intentar de nuevo</button>
      </div>
    );

  return (
    <FormContainer>
      <div>{!isLoaded ? <h1>Cargar Imagen</h1> : <h1>Imagen Cargada</h1>}</div>

      <form id='uploadForm' encType='multipart/form-data'>
        <input type='file' name='file' onChange={handleSelectedFile} />
        <input type='button' value='Cargar' onClick={handleUploadFile} />
      </form>
      <div>
        {progress > 0 && progress < 100 ? (
          <ProgressBar progress={progress}>{progress}%</ProgressBar>
        ) : (
          uploadedFile && (
            <IMG
              isLoaded={isLoaded}
              src={`${uploadedFile.path}`}
              alt={uploadedFile.name}
            />
          )
        )}
      </div>
    </FormContainer>
  );
}
