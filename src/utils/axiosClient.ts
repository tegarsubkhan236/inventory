import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            // @ts-ignore
            config.headers['Authorization'] = 'Bearer ' + token
        }
        // config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export default axiosClient;