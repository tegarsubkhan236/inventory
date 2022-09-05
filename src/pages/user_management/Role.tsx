import {Button, message, PageHeader, Table} from 'antd';
import type {TablePaginationConfig} from 'antd/es/table';
import React, {useEffect, useState} from 'react';
import {GetAllRole} from "../../service/RoleService";
import {RoleColumns, RoleDataType, RoleParams} from "./roleData";
import {selectableCell} from "../../utils/selectableCell";
import {ApiPagination} from "../../utils/pagination";

const Role = () => {
    const [data, setData] = useState<RoleDataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
    });
    const PageKey = "Role";

    const fetchData = (params: RoleParams) => {
        setLoading(true);
        GetAllRole({
            Page: params.pagination?.current,
            PerPage: params.pagination?.pageSize
        } as ApiPagination).then(res => {
            setData(res.data)
            setLoading(false);
            setPagination({
                ...params.pagination,
                total: res.pagination.total,
            });
        })
    };

    useEffect(() => {
        fetchData({pagination});
    }, []);

    const handleTableChange = (newPagination: TablePaginationConfig,) => {
        fetchData({
            pagination: newPagination
        });
    };

    const {rowSelection, hasSelected, resetSelect} = selectableCell(
        {setLoading, selectedRowKeys, setSelectedRowKeys}
    )
    // Delete Function
    const DeleteData = () => {
        selectedRowKeys.map((b, _) => {
            return (
                message.info(`Selected Row ID ${b}`)
            )
        });
    }

    return (
        <PageHeader
            title="User"
            subTitle="User Management"
            extra={[
                <Button key={`${PageKey}Add`} type="default">Add</Button>,
                <Button key={`${PageKey}Delete`} danger disabled={!hasSelected} onClick={DeleteData}>Delete</Button>,
                <Button key={`${PageKey}Reload`} type="default" onClick={resetSelect} disabled={!hasSelected}
                        loading={loading}>Reload</Button>,
                <span key={`${PageKey}Span`} style={{marginLeft: 8}}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            ]}
        >
            <Table
                columns={RoleColumns}
                rowKey={record => record.id}
                rowSelection={rowSelection}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </PageHeader>
    );
};

export default Role;