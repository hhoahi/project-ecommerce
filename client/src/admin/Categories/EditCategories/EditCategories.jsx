import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDataAdmin } from "../../../utils/api";
import Sidebar from "../../Sidebar/Sidebar";
import { useParams } from "react-router-dom";

function EditCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [categories, setCategories] = useState({
    title: "",
    desc: "",
  });

  const token = JSON.parse(localStorage.getItem("user"));
  const jwt = token?.jwt;

  useEffect(() => {
    getDataAdmin
      .get(`http://localhost:1337/api/categories/${id}`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setCategories((prevCategories) => ({
      ...prevCategories,
      data: {
        ...prevCategories.data,
        attributes: {
          ...prevCategories.data.attributes,
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);

    try {
      const uploadResponse = await getDataAdmin.post("/api/upload", formData, {
        mode: "no-cors",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      });

      const response = await getDataAdmin.put(
        `http://localhost:1337/api/categories/${id}`,
        {
          data: {
            title: categories.data.attributes.title,
            desc: categories.data.attributes.desc,
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
      if (response.status >= 200 && response.status < 300) {
        navigate("/categories");
      }
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
      <Sidebar />
      <div className="main-container">
        {categories && categories.data && categories.data.attributes && (
          <form className="container-create" onSubmit={handleSubmit}>
            <h3>Edit Product</h3>
            <div className="card-body">
              <label>ID</label>
              <input
                value={id}
                disabled="disabled"
                className="form-control"
              ></input>

              <label>Categories title</label>
              <input
                type="text"
                name="title"
                value={categories.data.attributes.title}
                onChange={handleProductChange}
                required
              />

              <label>Categories description</label>
              <input
                type="text"
                name="desc"
                value={categories.data.attributes.desc}
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

              <button className="btn btn-success" type="submit">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditCategories;
