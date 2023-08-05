import React, { useState } from "react";
import "../styles/Location.scss";
import { IoLocationSharp } from "react-icons/io5";

function Location() {
  const [selectedStore, setSelectedStore] = useState("tab_1");

  const handleStoreClick = (storeId) => (event) => {
    event.preventDefault();
    setSelectedStore(storeId);
  };
  return (
    <div className="location-main-content">
      <div className="layout">
        <div className="location-page">
          <div className="banner">
            <h2>STORE SYSTEM</h2>
          </div>
          <div className="content-container">
            <div className="left">
              <h3>STORE LIST</h3>
              <ul className="tabs-head">
                <li
                  className={selectedStore === "tab_1" ? "active" : ""}
                  onClick={handleStoreClick("tab_1")}
                >
                  <a href="#tab_1">
                    <IoLocationSharp /> Store 1 <br /> 71 Nguyen Trai Street,
                    Ward 2, District 5
                  </a>
                </li>

                <li
                  className={selectedStore === "tab_2" ? "active" : ""}
                  onClick={handleStoreClick("tab_2")}
                >
                  <a href="#tab_2">
                    <IoLocationSharp /> Store 2
                    <br /> 8 Ho Van Hue Street, Ward 9, Phu Nhuan District{" "}
                  </a>
                </li>

                <li
                  className={selectedStore === "tab_3" ? "active" : ""}
                  onClick={handleStoreClick("tab_3")}
                >
                  <a href="#tab_3">
                    <IoLocationSharp /> Store 3 <br /> 180 3/2 Street, Ward 12,
                    District 10
                  </a>
                </li>

                <li
                  className={selectedStore === "tab_4" ? "active" : ""}
                  onClick={handleStoreClick("tab_4")}
                >
                  <a href="#tab_4">
                    <IoLocationSharp /> Store 4 <br /> 334 Quang Trung Street,
                    Ward 10, Gò Vấp District
                  </a>
                </li>

                <li
                  className={selectedStore === "tab_5" ? "active" : ""}
                  onClick={handleStoreClick("tab_5")}
                >
                  <a href="#tab_5">
                    <IoLocationSharp /> Store 5 <br /> 243 Nguyen Thi Thap
                    Street, Tan Phu Ward, District 7
                  </a>
                </li>

                <li
                  className={selectedStore === "tab_6" ? "active" : ""}
                  onClick={handleStoreClick("tab_6")}
                >
                  <a href="#tab_6">
                    <IoLocationSharp /> Chi nhánh Cần Thơ - 0378923777 <br />{" "}
                    187 Nguyen Van Cu Street, Ninh Kieu District, Can Tho City
                  </a>
                </li>
              </ul>
            </div>
            <div className="right">
              <div className="tab-content">
                <div
                  id="tab_1"
                  style={{
                    display: selectedStore === "tab_1" ? "block" : "none",
                  }}
                >
                  <iframe
                    title="Adam Store Location"
                    width="100%"
                    height="450"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=+(Adam%20Store%20Nguy%E1%BB%85n%20Tr%C3%A3i)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/population/">
                      Calculate population in area
                    </a>
                  </iframe>
                </div>

                <div
                  id="tab_2"
                  style={{
                    display: selectedStore === "tab_2" ? "block" : "none",
                  }}
                >
                  <iframe
                    title="Adam Store Location"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=8%20H%E1%BB%93%20V%C4%83n%20Hu%C3%AA,%20Ph%C6%B0%E1%BB%9Dng%209,%20Ph%C3%BA%20Nhu%E1%BA%ADn,%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh+(Adam%20Store%20Nguy%E1%BB%85n%20Tr%C3%A3i)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/population/">
                      Population mapping
                    </a>
                  </iframe>
                </div>

                <div
                  id="tab_3"
                  style={{
                    display: selectedStore === "tab_3" ? "block" : "none",
                  }}
                >
                  <iframe
                    title="Adam Store Location"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=180%20%C4%90.%203%20Th%C3%A1ng%202,%20Ph%C6%B0%E1%BB%9Dng%2012,%20Qu%E1%BA%ADn%2010,%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh+(Adam%20Store%20Nguy%E1%BB%85n%20Tr%C3%A3i)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/population/">
                      Find Population on Map
                    </a>
                  </iframe>
                </div>

                <div
                  id="tab_4"
                  style={{
                    display: selectedStore === "tab_4" ? "block" : "none",
                  }}
                >
                  <iframe
                    title="Adam Store Location"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=S%E1%BB%91%20334%20%C4%91%C6%B0%E1%BB%9Dng%20Quang%20Trung,%20P.10,%20Qu%E1%BA%ADn%20G%C3%B2%20V%E1%BA%A5p+(Adam%20Store%20Nguy%E1%BB%85n%20Tr%C3%A3i)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/population/">
                      Calculate population in area
                    </a>
                  </iframe>
                </div>

                <div
                  id="tab_5"
                  style={{
                    display: selectedStore === "tab_5" ? "block" : "none",
                  }}
                >
                  <iframe
                    title="Adam Store Location"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=S%E1%BB%91%20243%20Nguy%E1%BB%85n%20Th%E1%BB%8B%20Th%E1%BA%ADp,%20ph%C6%B0%E1%BB%9Dng%20T%C3%A2n%20Ph%C3%BA,%20Q7+(Adam%20Store%20Nguy%E1%BB%85n%20Tr%C3%A3i)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/population/">
                      Calculate population in area
                    </a>
                  </iframe>
                </div>

                <div
                  id="tab_6"
                  style={{
                    display: selectedStore === "tab_6" ? "block" : "none",
                  }}
                >
                  <iframe
                    title="Adam Store Location"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=S%E1%BB%91%20187%20Nguy%E1%BB%85n%20V%C4%83n%20C%E1%BB%AB,%20qu%E1%BA%ADn%20Ninh%20Ki%E1%BB%81u,%20Tp%20C%E1%BA%A7n%20Th%C6%A1+(Adam%20Store%20Nguy%E1%BB%85n%20Tr%C3%A3i)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/population/">
                      Find Population on Map
                    </a>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
