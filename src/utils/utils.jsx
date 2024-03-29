import { jwtDecode } from "jwt-decode"

// export const setAccessToken = (data) => {
//     const accessToken = jwtDecode(data?.access).exp;
//     console.log("accessToken", accessToken);
//     localStorage.setItem("accessToken", accessToken);
// };

export const setTokenTimestamp = (data) => {
    console.log('refreshing token timestamp')
    const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
    console.log("set refreshTokenTimestamp", refreshTokenTimestamp);
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
    const refreshtokenexists = !!localStorage.getItem("refreshTokenTimestamp");
    console.log("refreshTokenTimestamp exists ", refreshtokenexists);
    return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
    console.log("refreshTokenTimestamp removed");
};