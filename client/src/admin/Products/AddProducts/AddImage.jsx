import React, { useState } from "react";
import axios from "axios";

function AddImage() {
  const [files, setFiles] = useState();

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("files", files[0]);

    axios
      .post("http://localhost:1337/api/upload", formData)
      .then((response) => {
        const imageId = response.data[0].id;

        axios
          .post("http://localhost:1337/api/products?populate=*", {
            image: imageId,
          })
          .then((response) => {
            //handle success
          })
          .catch((error) => {
            //handle error
          });
      })
      .catch((error) => {
        //handle error
      });
  };

  return (
    <form onSubmit={uploadImage}>
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddImage;
