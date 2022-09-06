import React, {Dispatch, SetStateAction} from "react";
import {TablePaginationConfig} from "antd/es/table";
import {message} from "antd";
import {ApiPagination} from "../utils/pagination";
import {BatchDeleteSingleRole, CreateRole, DeleteSingleRole, GetAllRole, UpdateRole} from "../service/RoleService";

type Dispatcher<S> = Dispatch<SetStateAction<S>>

export interface RoleDataType {
    id: React.Key
    name: string;
}

export interface RoleState {
    id ?: React.Key
    setData?: Dispatcher<RoleDataType[]>
    setLoading?: Dispatcher<boolean>
    setConfirmLoading?: Dispatcher<boolean>
    setVisible?: Dispatcher<boolean>
    setRefreshKey?: Dispatcher<number>
    setPagination?: Dispatcher<TablePaginationConfig>
    pagination?: ApiPagination
    values?: RoleDataType
    setSelectedRowKeys ?: Dispatcher<React.Key[]>
    selectedRowKeys ?: React.Key[]
}

// Get Data
export const FetchData = ({setLoading, setData, setPagination, pagination}: RoleState) => {
    if (pagination && setPagination && setData && setLoading) {
        setLoading(true);
        GetAllRole(pagination).then(res => {
            setData(res.data)
            setLoading(false);
            setPagination({
                ...pagination.pagination,
                total: res.pagination.total,
            });
        })
    }
};

// Save Function
export const SaveData = async ({setLoading, setConfirmLoading, setVisible, setRefreshKey, values}: RoleState) => {
    if (setLoading && setConfirmLoading && values && setVisible && setRefreshKey) {
        try {
            setConfirmLoading(true)
            await CreateRole(values).then(e => {
                setLoading(false);
                setVisible(false)
                setConfirmLoading(false)
                message.info(e.data)
            })
            setRefreshKey(oldKey => oldKey + 1)
        } catch (errInfo) {
            setLoading(false)
            console.log('Validate Failed:', errInfo);
        }
    }
};

// Delete Function
export const DeleteData = async ({id, setLoading, setSelectedRowKeys, setRefreshKey }: RoleState) => {
    if (id && setLoading && setSelectedRowKeys && setRefreshKey) {
        try {
            setLoading(true)
            await DeleteSingleRole(id).then(() => {
                setLoading(false)
            })
            setSelectedRowKeys([]);
            setRefreshKey(oldKey => oldKey + 1)
        } catch (errInfo) {
            setLoading(false)
            console.log('Validate Failed:', errInfo);
        }
    }
}

// Update Function
export const UpdateData = async ({id, setLoading, setConfirmLoading, setVisible, setRefreshKey, values}: RoleState) => {
    if (id && setLoading && setConfirmLoading && values && setVisible && setRefreshKey) {
        try {
            setConfirmLoading(true)
            await UpdateRole(id,values)
                .then(e => {
                    setLoading(false);
                    setVisible(false)
                    setConfirmLoading(false)
                    message.info(e.data)
                }).catch(() => setLoading(false))
            setRefreshKey(oldKey => oldKey + 1)
        } catch (errInfo) {
            setLoading(false)
            console.log('Validate Failed:', errInfo);
        }
    }
};

// Batch Delete Function
export const BatchDeleteData = async ({setLoading, selectedRowKeys, setSelectedRowKeys, setRefreshKey}: RoleState) => {
    if (setLoading && setSelectedRowKeys && setRefreshKey && selectedRowKeys) {
        setLoading(true)
        await BatchDeleteSingleRole(selectedRowKeys).then(() => setLoading(false)).catch(() => setLoading(false))
        setSelectedRowKeys([]);
        setRefreshKey(oldKey => oldKey +1)
    }
}

