import axios from "axios";

    // New api
axios.defaults.baseURL = "https://api-positive-a53d71b6a573.herokuapp.com/";
    // GitPod
// axios.defaults.baseURL = "https://8000-parbelaez-apipositivepp-5xtfwrcwnaj.ws-eu107.gitpod.io/"
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();