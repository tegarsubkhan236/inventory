import { Button, PageHeader, Space, Table, Tag, Modal } from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import type { ColumnsType } from 'antd/es/table';
import {useState} from 'react'
import './user.less';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button danger onClick={()=>console.log(record)}>
                    <DeleteOutlined />Delete
                </Button>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const User = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="User"
                    subTitle="User Management"
                    extra={[
                        <Button key="1" type="primary" onClick={showModal}>
                            Add New
                        </Button>,
                    ]}
                >
                    <Table columns={columns} dataSource={data} />
                </PageHeader>
            </div>

            {/*Add New*/}
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    )
}

export default User;
