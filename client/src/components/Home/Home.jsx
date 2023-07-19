import "./Home.scss";
import Category from "./Category/Category";
const Home = () => {
    return (
        <div>
            <div className="main-content">
                <div className="layout">
                    <Category/>
                </div>
            </div>
        </div>
    )
};

export default Home;
