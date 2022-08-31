import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            // @ts-ignore
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        Promise.reject(error)
        window.location.href = '/login'
    }
);

// axiosClient.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         const originalConfig = err.config;
//         if (originalConfig.url !== "/v1/api/login" && err.response) {
//             // Access Token was expired
//             if (err.response.status === 401 && !originalConfig._retry) {
//                 originalConfig._retry = true;
//                 try {
//                     const rs = await instance.post("/auth/refreshtoken", {
//                         refreshToken: TokenService.getLocalRefreshToken(),
//                     });
//                     const { accessToken } = rs.data;
//                     TokenService.updateLocalAccessToken(accessToken);
//                     return instance(originalConfig);
//                 } catch (_error) {
//                     return Promise.reject(_error);
//                 }
//             }
//         }
//         return Promise.reject(err);
//     }
// )

export default axiosClient;