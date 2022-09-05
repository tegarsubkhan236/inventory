import axiosClient from "../utils/axiosClient";
import {ApiPagination} from "../utils/pagination";

export const GetAllRole = ({Page, PerPage}: ApiPagination) => {
    return axiosClient.get("/v1/api/role/list", {params: {page : Page, per_page : PerPage}}).then(res => {
        return res.data
    });
};