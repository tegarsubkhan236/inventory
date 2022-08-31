import axiosClient from "../utils/axiosClient";

interface loginProps {
    name?: string,
    username: string,
    sex?: string,
    email?: string,
    password: string,
    role_id?: number
}

export const register = ({name, username, sex, email, password, role_id = 1} : loginProps) => {
    return axiosClient.post("/auth/signup", {
        name, username, sex, email, password, role_id
    });
};

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
}

export const getCurrentUser = () => {
    const token = localStorage.getItem("token")
    if (token != null){
        return JSON.parse(token);
    }
};