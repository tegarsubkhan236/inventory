import {Button, message, PageHeader, Table} from 'antd';
import type {TablePaginationConfig} from 'antd/es/table';
import React, {useEffect, useState} from 'react';
import {GetAllUser} from "../../service/UserService";
import {UserColumns, UserDataType, UserParams} from "../../data/userData";
import {selectableCell} from "../../utils/selectableCell";

const User = () => {
    const [data, setData] = useState<UserDataType[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const PageKey = "User";

    const {rowSelection, hasSelected, resetSelect} = selectableCell(
        {setLoading, selectedRowKeys, setSelectedRowKeys}
    )

    // Get Data
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

    // Delete Function
    const DeleteData = () => {
        selectedRowKeys.map((b, _) => {
            return (
                message.info(`Selected Row ID ${b}`)
            )
        });
    }

    const handleTableChange = (newPagination: TablePaginationConfig,) => {
        fetchData({
            pagination: newPagination
        });
    };

    useEffect(() => {
        fetchData({pagination});
    }, []);

    return (
        <PageHeader
            title="User"
            subTitle="User Management"
            extra={[
                <Button key={`${PageKey}Add`} type="default">Add</Button>,
                <Button key={`${PageKey}Delete`} danger disabled={!hasSelected} onClick={DeleteData}>Delete</Button>,
                <Button key={`${PageKey}Reload`} type="default" onClick={resetSelect} disabled={!hasSelected} loading={loading}>Reload</Button>,
                <span key={`${PageKey}Span`} style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            ]}
        >
            <Table
                columns={UserColumns}
                rowKey={record => record.id.toString()}
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