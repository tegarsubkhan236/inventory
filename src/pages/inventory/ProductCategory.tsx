import {Button, Form, message, PageHeader, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    BatchDeleteProductCategory,
    CreateProductCategory,
    GetAllProductCategory,
    UpdateProductCategory,
} from "../../service/ProductCategoryService";
import {EditingColumnProductCategory, ProductCategoryDataType} from "../../data/productCategoryData";
import {EditableCell} from "../../utils/editableCell";
import {selectableCell} from "../../utils/selectableCell";
import ProductCategoryForm from "./ProductCategoryForm";

const ProductCategory = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ProductCategoryDataType[]>([]);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [editingKey, setEditingKey] = useState<React.Key>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const PageKey = "ProductCategory";

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
            setRefreshKey(oldKey => oldKey + 1)
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
            setRefreshKey(oldKey => oldKey +1)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // Delete Function
    const DeleteData = async () => {
        try {
            setLoading(true)
            await BatchDeleteProductCategory(selectedRowKeys).then(e => {
                setLoading(false)
            })
            setSelectedRowKeys([]);
            setRefreshKey(oldKey => oldKey +1)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
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
            setData(res)
        })
    }, [refreshKey])

    return (
        <>
            <PageHeader
                title="Product Category"
                subTitle="Inventory"
                extra={[
                    <Button key={`${PageKey}Add`}  type="default" onClick={() => setVisible(true)}>Add</Button>,
                    <Button key={`${PageKey}Delete`}  danger disabled={!hasSelected} onClick={DeleteData}>Delete</Button>,
                    <Button key={`${PageKey}Reload`} type="default" onClick={resetSelect} disabled={!hasSelected}
                            loading={loading}>Reload</Button>,
                    <span key={`${PageKey}Span`} style={{marginLeft: 8}}>
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
                        columns={Columns}
                        rowKey={record => record.id.toString()}
                        rowSelection={rowSelection}
                        loading={loading}
                        pagination={{
                            onChange: () => setEditingKey(''),
                        }}
                    />
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