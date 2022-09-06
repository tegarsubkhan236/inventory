import axiosClient from "../utils/axiosClient";
import {ApiPagination} from "../utils/pagination";
import React from "react";

interface Item {
    name : string
}

export const GetAllRole = ({pagination}: ApiPagination) => {
    return axiosClient.get("/v1/api/role/list", {params: {page : pagination?.current, per_page : pagination?.pageSize}}).then(res => {
        return res.data
    });
};

export const CreateRole = async (item : Item) => {
    return await axiosClient.post("v1/api/role/create", {
        name : item.name
    }).then(res => {
        return res.data
    });
};

export const UpdateRole = async (id: React.Key, item : Item) => {
    return await axiosClient.put("/v1/api/role/update/"+id, {
        name : item.name
    }).then(res => {
        return res.data
    });
};

export const DeleteSingleRole = async (id: React.Key) => {
    return await axiosClient.delete("/v1/api/role/delete/"+id)
};

export const BatchDeleteSingleRole = async (id: React.Key[]) => {
    return await axiosClient.delete("/v1/api/role/delete/"+id)
};
