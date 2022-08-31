import axiosClient from "../utils/axiosClient";

export const GetAllUser = () => {
    return axiosClient.get("/v1/api/user/list").then(res => {
        return res.data.data
    });
};