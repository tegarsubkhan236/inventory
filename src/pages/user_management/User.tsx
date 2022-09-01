import {Button, message, PageHeader, Table} from 'antd';
import type {TablePaginationConfig} from 'antd/es/table';
import React, {useEffect, useState} from 'react';
import {GetAllUser} from "../../service/UserService";
import {UserColumns, UserParams} from "./userData";

const User = () => {
    const [data, setData] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
    });

    const fetchData = (params: UserParams) => {
        setLoading(true);
        GetAllUser().then(res => {
            setData(res)
            setLoading(false);
            setPagination({
                ...params.pagination,
                total: 200,
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

    const resetSelect = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 500);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const showSelectedRow = () => {
        selectedRowKeys.map((b,_) => {
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
                <Button key="add" type="default">Add</Button>,
                <Button key="delete" danger disabled={!hasSelected} onClick={showSelectedRow}>Delete</Button>,
                <Button type="default" onClick={resetSelect} disabled={!hasSelected} loading={loading}>Reload</Button>,
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            ]}
        >
            <Table
                columns={UserColumns}
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

export default User;