import axiosClient from "../utils/axiosClient";

export const GetAllRole = () => {
    return axiosClient.get("/v1/api/role/list").then(res => {
        return res.data
    });
};