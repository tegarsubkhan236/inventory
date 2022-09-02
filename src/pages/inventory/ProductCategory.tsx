import {Button, Form, message, PageHeader, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    CreateProductCategory,
    GetAllProductCategory,
    UpdateProductCategory,
} from "../../service/ProductCategoryService";
import {EditingColumnProductCategory, ProductCategoryDataType} from "./productCategoryData";
import {EditableCell} from "../../utils/editableCell";
import {selectableCell} from "../../utils/selectableCell";
import ProductCategoryForm from "./ProductCategoryForm";
import {EditableContext} from "../../context/EditableContext";

const ProductCategory = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [editingKey, setEditingKey] = useState<React.Key>('');
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    // Update Function
    const UpdateData = async (id: React.Key) => {
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

    // Save Function
    const SaveData = async (values: ProductCategoryDataType) => {
        try {
            setLoading(true);
            setConfirmLoading(true)
            await CreateProductCategory(values).then(e => {
                setLoading(false);
                setVisible(false)
                setConfirmLoading(false)
                message.info(e.data)
            })
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // Delete Function
    const DeleteData = () => {
        console.log(selectedRowKeys)
        selectedRowKeys.map((b, _) => {
            return (
                message.info(`Selected Row ID ${b}`)
            )
        });
    }

    const {rowSelection, hasSelected, resetSelect} = selectableCell(
        {setLoading, selectedRowKeys, setSelectedRowKeys}
    )
    const Columns = EditingColumnProductCategory(
        {editingKey, setEditingKey, UpdateData, form}
    )

    // Get Function
    useEffect(() => {
        GetAllProductCategory().then(res => {
            // const results = res.map((row: { name: string; id: any; }) => ({
            //     key : row.id,
            //     id : row.id,
            //     name : row.name
            // }))
            setData(res)
        })
    }, [editingKey, confirmLoading])

    return (
        <>
            <PageHeader
                title="Product Category"
                subTitle="Inventory"
                extra={[
                    <Button key="add" type="default" onClick={() => setVisible(true)}>Add</Button>,
                    <Button key="delete" danger disabled={!hasSelected} onClick={DeleteData}>Delete</Button>,
                    <Button type="default" onClick={resetSelect} disabled={!hasSelected}
                            loading={loading}>Reload</Button>,
                    <span style={{marginLeft: 8}}>
                      {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                ]}
            >
                <Form form={form} component={false}>
                    <EditableContext.Provider value={form}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={Columns}
                        rowKey={record => record.id.toString()}
                        rowSelection={rowSelection}
                        loading={loading}
                        pagination={{
                            onChange: () => setEditingKey(''),
                        }}
                    />
                    </EditableContext.Provider>
                </Form>
            </PageHeader>
            {visible
                ? <ProductCategoryForm
                    visible={visible}
                    setVisible={setVisible}
                    confirmLoading={confirmLoading}
                    handleOk={SaveData}/>
                : ''
            }
        </>
    );
};

export default ProductCategory;