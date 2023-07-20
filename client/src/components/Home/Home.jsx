import "./Home.scss";

<<<<<<< HEAD
import Banner from './Banner/Banner';


=======
import Banner from "./Banner/Banner";
>>>>>>> f24030e4395728c46a97be09aa2541bcc1b58c77
import Category from "./Category/Category";
import Products from "../Products/Products";

const Home = () => {
<<<<<<< HEAD
    return (

        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category />
                </div>
            </div>
        </div>
    )

=======
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category />
          <Products headingText="Popular Products" />
        </div>
      </div>
    </div>
  );
>>>>>>> f24030e4395728c46a97be09aa2541bcc1b58c77
};

export default Home;
