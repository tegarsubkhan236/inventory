import {Button, message, PageHeader, Table, Tag} from 'antd';
import type {ColumnsType, TablePaginationConfig} from 'antd/es/table';
import React, {useEffect, useState} from 'react';
import {GetAllUser} from "../../service/UserService";

interface DataType {
    name: string;
    sex: string;
    email: string;
    role_id: {
        id: number,
        name: string
    }
    id: number;
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
    },
    {
        title: 'Roles',
        key: 'role_id',
        dataIndex: 'role_id',
        render: (_, {role_id}) => (
            <>
                <Tag color={"green"} key={role_id.id}>
                    {role_id.name?.toUpperCase()}
                </Tag>
            </>
        ),
    },
];

const User = () => {
    const [data, setData] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
    });

    const fetchData = (params: Params) => {
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

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
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
        selectedRowKeys.map((b,a) => {
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
                <Button key="delete" danger disabled={!hasSelected} onClick={showSelectedRow}>Delete</Button>,
                <Button key="edit" type="default" disabled={!hasSelected} onClick={showSelectedRow}>Edit</Button>,
                <Button key="add" type="default">
                    Add
                </Button>,
                <Button type="default" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>,
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            ]}
        >
            <Table
                columns={columns}
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