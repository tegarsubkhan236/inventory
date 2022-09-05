import axiosClient from "../utils/axiosClient";
import React from "react";

interface Item {
    name : string
}

export const GetAllProductCategory = async () => {
    return await axiosClient.get("/v1/api/product_category/list").then(res => {
        return res.data
    })
};

export const CreateProductCategory = async (item : Item) => {
    return await axiosClient.post("/v1/api/product_category/create", {
        name : item.name
    }).then(res => {
        return res.data
    });
};

export const UpdateProductCategory = async (id: React.Key, item : Item) => {
    return await axiosClient.put("/v1/api/product_category/update/"+id, {
        name : item.name
    }).then(res => {
        return res.data
    });
};

export const BatchDeleteProductCategory = async (id: React.Key[]) => {
    return await axiosClient.post("/v1/api/product_category/batch_delete", {
        id : id
    })
};