import {Button, Form, message, Popconfirm, Table, Typography, PageHeader, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {GetAllProductCategory, UpdateProductCategory} from "../../service/ProductCategory";
import {EditableCell} from "../../utils/editableCell";
import {ProductCategoryDataType} from "./productCategoryData";

const ProductCategory = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [editingKey, setEditingKey] = useState<React.Key>('');
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const isEditing = (record: ProductCategoryDataType) => record.id === editingKey;

    const edit = (record: Partial<ProductCategoryDataType> & { id: React.Key }) => {
        form.setFieldsValue({
            name: '',
            ...record
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id: React.Key) => {
        try {
            setLoading(true);
            const row = (await form.validateFields()) as ProductCategoryDataType;
            await UpdateProductCategory(id, row).then(e => {
                setLoading(false);
                message.info(e.data)
            })
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'name', dataIndex: 'name', editable: true,
        }, {
            title: 'operation', dataIndex: 'operation', width: '25%', render: (_: any, record: ProductCategoryDataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{marginRight: 8}}>
                          Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          Cancel
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col, onCell: (record: ProductCategoryDataType) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    useEffect(() => {
        GetAllProductCategory().then(res => {
            setData(res)
        })
    }, [editingKey])

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
            <PageHeader
                title="Product Category"
                subTitle="Inventory"
                extra={[
                    <Button key="add" type="default" onClick={showModal}>Add</Button>,
                    <Button key="delete" danger disabled={!hasSelected} onClick={showSelectedRow}>Delete</Button>,
                    <Button type="default" onClick={resetSelect} disabled={!hasSelected} loading={loading}>Reload</Button>,
                    <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                ]}
            >
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowKey={record => record.id}
                        rowSelection={rowSelection}
                        loading={loading}
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            </PageHeader>
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
        );
};

export default ProductCategory;