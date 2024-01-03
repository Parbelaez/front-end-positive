import axios from "axios";

// New api
axios.defaults.baseURL = "https://api-positive-a53d71b6a573.herokuapp.com";
// Old api
// axios.defaults.baseURL = "https://positive-api-55b6b5b25a88.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
