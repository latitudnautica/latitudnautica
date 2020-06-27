import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ProgressBar = styled.div`
  width: ${(props) => props.progress || 0}%;
  height: 1rem;
  background-color: rgb(68, 212, 231);
  color: white;
  padding: 2px;
`;

const IMG = styled.img`
  width: 100px;
  height: 100px;
  transition: 1s;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
`;

export default function UploadFiles(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({ name: "", path: "" });
  const [progress, setProgress] = useState(0); // progress bar

  const handleSelectedFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setProgress(0);
    setLoaded(false);
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    setProgress(0);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("prod_id", props.prodId);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/product/upload/image`, data, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgress(progress);
        }
      })
      .then((res) => {
        // then print response status
        setLoaded(true);
        setUploadedFile({ name: res.data.name, path: res.data.path });
        console.log(res);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form
        id='uploadForm'
        action='/api/upload/image'
        method='post'
        encType='multipart/form-data'
      >
        <input type='file' name='file' onChange={handleSelectedFile} />
        <input type='button' value='Upload!' onClick={handleUploadFile} />
      </form>
      <div>{loaded ? "imagen cargada" : "selecciona imagen"}</div>
      <ProgressBar progress={progress}>{progress}%</ProgressBar>
      {uploadedFile && (
        <IMG
          isLoaded={loaded}
          src={`http://localhost:5000/public/products/images/${uploadedFile.name}`}
          alt={uploadedFile.name}
        />
      )}
    </div>
  );
}
