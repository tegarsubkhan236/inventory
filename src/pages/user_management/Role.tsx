import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import {GetAllRole} from "../../service/RoleService";

interface DataType {
    id: number
    name: string;
}

interface Params {
    pagination?: TablePaginationConfig;
    total?: number;
}

const columns: ColumnsType<DataType> = [
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

const Role = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
    });

    const fetchData = (params: Params) => {
        setLoading(true);
        GetAllRole().then(res => {
            setData(res)
            setLoading(false);
            setPagination({
                ...params.pagination,
                total: 200,
            });
        })
    };

    useEffect(() => {
        fetchData({ pagination, });
    }, []);

    const handleTableChange = (
        newPagination: TablePaginationConfig,
    ) => {
        fetchData({
            pagination: newPagination
        });
    };

    // @ts-ignore
    return (
        <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};

export default Role;