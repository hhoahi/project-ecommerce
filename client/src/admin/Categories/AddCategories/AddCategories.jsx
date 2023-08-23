import React, { useState } from "react";
import { getDataAdmin } from "../../../utils/api";
import Sidebar from "../../Sidebar/Sidebar";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import "./AddCategories.scss";

const initialCategories = {
  title: "",
};

function AddCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"));
  const jwt = token?.jwt;

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setCategories((prevCategories) => ({
      ...prevCategories,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", image);

    try {
      console.log(formData);
      const uploadResponse = await getDataAdmin.post("/api/upload", formData, {
        mode: "no-cors",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log(uploadResponse);

      const response = await getDataAdmin.post(
        "/api/categories",
        {
          data: {
            title: categories.title,
            desc: categories.desc,
            img: uploadResponse.data[0].id,
          },
        },
        {
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log("Success");
      }
      setShowSuccessMessage(true);
     const timeout = setTimeout(() => {
        setShowSuccessMessage(false); // Tắt thông báo sau 2 giây
      }, 3000);
      return () => {
        // 👇️ clear timeout when the component unmounts
        clearTimeout(timeout);
      };
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="grid-container">
      <div className="main-content-add-category">
        <form className="container-create" onSubmit={handleSubmit}>
          <h3>Add Categories</h3>
          {showSuccessMessage && (
            <div className="success-message">
              Successfully Updated.
              <IoCheckmarkDoneSharp />
            </div>
          )}
          <div className="card-body">
            <label>Product name</label>
            <input
              type="text"
              name="title"
              value={categories.title}
              onChange={handleProductChange}
              required
            />

            <label>Categories description</label>
            <input
              type="text"
              name="desc"
              value={categories.desc}
              onChange={handleProductChange}
              required
            />
            <label>Upload categories images</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="input-img"
              id="file-input"
            />
            <div className="media-img">
              {imageUrl && <img src={imageUrl} alt="Selected Image" />}
            </div>
            <button type="submit" value="Upload">
              Add categories
            </button>
          </div>
        </form>
      </div>
      {/* <button onClick={} className="add-cate">
          <IoIosArrowUp />
        </button> */}
    </div>
  );
}

export default AddCategories;
