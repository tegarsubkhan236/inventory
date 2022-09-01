import {Table} from 'antd';
import type {TablePaginationConfig} from 'antd/es/table';
import React, {useEffect, useState} from 'react';
import {GetAllRole} from "../../service/RoleService";
import {RoleParams, RoleColumns} from "./roleData";

const Role = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
    });

    const fetchData = (params: RoleParams) => {
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
        fetchData({pagination,});
    }, []);

    const handleTableChange = (newPagination: TablePaginationConfig,) => {
        fetchData({
            pagination: newPagination
        });
    };

    return (
        <Table
            columns={RoleColumns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};

export default Role;