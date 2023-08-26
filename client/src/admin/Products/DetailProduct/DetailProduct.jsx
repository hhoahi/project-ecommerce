import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./DetailProduct.scss";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

const Edit = () => {
  const { id } = useParams();
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

  if (!data) return;
  const product = data?.data?.[0]?.attributes;

  return (
    <div className="grid-container-cate">
      <div className="main-container">
        <form className="container-create">
          <h3>Detail Product</h3>
          <div className="detail-content">
            <div className="left-detail">
              {product &&
                product.img &&
                product.img.data &&
                product.img.data[0] && (
                  <img
                    src={stripeAppDevUrl + product.img.data[0].attributes.url}
                    alt=""
                  />
                )}
            </div>
            <div className="right-detail">
              {product ? (
                <div>
                  <span className="name">{product?.title}</span> <br />
                  <span className="price">Price: &#x24;{product?.price}</span> <br />
                  <span className="desc">Description: {product?.desc}</span> <br />
                  <span className="cate">Categogy: {product.categories.data[0].attributes.title}</span>
                </div>
              ) : (
                <span>Loading product...</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
