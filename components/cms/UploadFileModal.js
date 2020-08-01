import { useState, useRef } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

import Button from "../Button";
import axiosBase from "../../utils/axiosBase";
ReactModal.setAppElement("#__next");

const ModalStyled = styled.div`
  border: 1px solid red;
  form {
    display: flex;
    flex-direction: column;

    input,
    button {
      margin: 10px 0;
    }
  }
`;



const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    transition: "transform 500ms"
  }
};

const UploadFileModal = () => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0); // progress bar
  const inputTitle = useRef();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    console.log("formData", formData);

    axiosBase({
      method: "post",
      url: `/utils/banner`,
      data: formData,
      headers: {
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
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err, err.response);
      });
  };

  return (
    <div>
      <Button onClick={openModal}>Cargar Nuevo Banner</Button>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Cargar banner</h2>
        <button onClick={closeModal}>X</button>
        <ModalStyled>
          <form>
            <label>Titulo de la imagen</label>
            <input ref={inputTitle} type='text' name='title' required />
            <label>Banner</label>
            <input
              type='file'
              name='file'
              required
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button type='submit' onClick={uploadFile}>
              enviar
            </button>
          </form>
        </ModalStyled>
      </ReactModal>
    </div>
  );
};

export default UploadFileModal;
