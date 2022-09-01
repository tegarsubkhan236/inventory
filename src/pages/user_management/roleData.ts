import React from "react";
import {ColumnsType, TablePaginationConfig} from "antd/es/table";

interface RoleDataType {
    id: React.Key
    name: string;
}

export interface RoleParams {
    pagination?: TablePaginationConfig;
    total?: number;
}

export const RoleColumns: ColumnsType<RoleDataType> = [
    {
        title: '#',
        dataIndex: 'id',
        width: '20%',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
];