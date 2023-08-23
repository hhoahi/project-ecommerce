import axios from "axios";

const params = {
  headers: {
    Authorization: "bearer " + JSON.parse(localStorage.getItem("user"))?.jwt,
  },
};

//thực hiện yêu cầu GET đến một API với URL được cung cấp và các thông tin tiêu đề từ params
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_STRIPE_APP_DEV_URL + url,
      params
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const makePaymentRequest = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const saveDataToStrapi = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const getUserProfile = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const getProfile = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const getDataAdmin = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const getOrderUser = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const postCartUser = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const getData = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const postData = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

export const postDataAdmin = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});

// export const getCurrentUser = axios.get({
//   baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
//   headers: {
//     Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
//   },
// });

// export const getCurrentUser = async () => {
//   try {
//     const data = await axios(
//       "http://localhost:1337/api/users/me?populate=role",
//       {
//         headers: {
//           Authorization:
//             "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjkyNjk5MTMwLCJleHAiOjE2OTUyOTExMzB9.ifcF8EzhlDnTzrNtlbozr_rDgdsR-5qfEZyLjTXTkFo",
//         },
//       }
//     );

//     return data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };
export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_STRIPE_APP_DEV_URL + "/api/users/me?populate=role",
      params
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
