import React from "react";
import {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {Tag} from "antd";

export interface UserDataType {
    id: React.Key;
    name: string;
    sex: string;
    email: string;
    role_id: {
        id: React.Key,
        name: string
    }
}

export interface UserParams {
    pagination?: TablePaginationConfig;
    total?: number;
}

export const UserColumns: ColumnsType<UserDataType> = [
    {
        title: '#',
        dataIndex: 'id',
        width: '10%',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'sex',
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: '20%',
    },
    {
        title: 'Roles',
        key: 'role_id',
        dataIndex: 'role_id',
        width: '20%',
        render: (_, {role_id}) => (
            <>
                <Tag color={"green"} key={role_id.id.toString()}>
                    {role_id.name?.toUpperCase()}
                </Tag>
            </>
        ),
    },
];