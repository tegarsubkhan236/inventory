import {Button, message, PageHeader, Popconfirm, Space, Table, Tooltip} from 'antd';
import type {TablePaginationConfig} from 'antd/es/table';
import {ColumnsType} from "antd/es/table";
import React, {useEffect, useState} from 'react';
import {BatchDeleteData, DeleteData, FetchData, RoleDataType, SaveData, UpdateData} from "../../data/roleData";
import {selectableCell} from "../../utils/selectableCell";
import {ApiPagination} from "../../utils/pagination";
import RoleForm from "./RoleForm";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const Role = () => {
    const [data, setData] = useState<RoleDataType[]>([]);
    const [item, setItem] = useState<RoleDataType | undefined>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRowKey, setSelectedRowKey] = useState<React.Key | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [pagination, setPagination] = useState<TablePaginationConfig>({current: 1, pageSize: 8,});
    const {rowSelection, hasSelected, resetSelect} = selectableCell({setLoading, selectedRowKeys, setSelectedRowKeys})
    const PageTitle = "Role";
    const PageSubTitle = "User Management";
    const PageKey = "Role";

    const fetchData = (pagination: ApiPagination) => FetchData({
        setLoading,
        setData,
        setPagination,
        pagination
    })
    const saveData = (values: RoleDataType) => SaveData({
        setLoading,
        setConfirmLoading,
        setVisible,
        setRefreshKey,
        values
    })
    const deleteData = (id: React.Key) => DeleteData({
        id,
        setLoading,
        setSelectedRowKeys,
        setRefreshKey
    })
    const updateData = (values: RoleDataType, id: React.Key) => UpdateData({
        id,
        setLoading,
        setConfirmLoading,
        setVisible,
        setRefreshKey,
        values
    })
    const batchDeleteData = () => BatchDeleteData({
        setLoading,
        selectedRowKeys,
        setSelectedRowKeys,
        setRefreshKey
    })
    const RoleColumns: ColumnsType<RoleDataType> = [
        {
            title: '#',
            dataIndex: 'id',
            width: '20%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={`Edit`} trigger={"hover"}>
                        <Button onClick={() => {
                            setVisible(true)
                            setSelectedRowKey(record.id)
                            setItem(record)
                        }} type="dashed" shape="circle" icon={<EditOutlined/>}/>
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        onConfirm={() => deleteData(record.id)}
                        onCancel={() => message.error('Item is not deleted')}
                        okText="Yes"
                        cancelText="No">
                        <Tooltip title={`Delete`} trigger={"hover"}>
                            <Button type="dashed" shape="circle" danger icon={<DeleteOutlined/>}/>
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchData({pagination});
    }, [refreshKey]);

    return (
        <>
            <PageHeader
                title={PageTitle}
                subTitle={PageSubTitle}
                extra={[
                    <Button key={`${PageKey}Add`} type="default" onClick={() => setVisible(true)}>Add</Button>,
                    <Popconfirm
                        title={`Are you sure to delete ${selectedRowKeys.length} item?`}
                        onConfirm={batchDeleteData}
                        onCancel={() => message.error(`${selectedRowKeys.length} Item is not deleted`)}
                        okText="Yes"
                        cancelText="No">
                        <Button key={`${PageKey}Delete`} danger disabled={!hasSelected}>Delete</Button>
                    </Popconfirm>,
                    <Button key={`${PageKey}Reload`} type="default" onClick={resetSelect} disabled={!hasSelected}
                            loading={loading}>Reload</Button>,
                    <span key={`${PageKey}Span`} style={{marginLeft: 8}}>
                      {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                ]}
            >
                <Table
                    columns={RoleColumns}
                    scroll={{y: 300}}
                    rowKey={record => record.id}
                    rowSelection={rowSelection}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={(newPagination: TablePaginationConfig) => {
                        fetchData({
                            pagination: newPagination
                        });
                    }}
                />
            </PageHeader>
            {(visible) || (visible && selectedRowKey)
                ? <RoleForm
                    id={selectedRowKey}
                    setId={setSelectedRowKey}
                    item={item}
                    setItem={setItem}
                    title={PageTitle}
                    visible={visible}
                    setVisible={setVisible}
                    confirmLoading={confirmLoading}
                    handleSave={saveData}
                    handleUpdate={updateData}/>
                : ''
            }
        </>
    );
};

export default Role;
