import axiosClient from "../utils/axiosClient";
import {useNavigate} from "react-router-dom";

interface loginProps {
    username: string,
    password: string,
}


export const login = ({username, password}: loginProps) => {
    return axiosClient.post(`/v1/api/login`, {
        identity: username,
        password: password
    }).then(response => {
        if (response.data) {
            localStorage.setItem("token", JSON.stringify(response.data.data));
        }
        return response.data.data;
    });
}

export const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
    return
}