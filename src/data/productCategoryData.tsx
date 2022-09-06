import {FormInstance, Popconfirm, Typography} from "antd";
import React, {Dispatch, SetStateAction} from 'react';

type Dispatcher<S> = Dispatch<SetStateAction<S>>

export interface ProductCategoryDataType {
    id: React.Key;
    name: string;
}

interface EditingColumnProductCategoryProps {
    editingKey: React.Key;
    setEditingKey: Dispatcher<React.Key>,
    UpdateData: (id: React.Key) => void,
    form: FormInstance
}

export const EditingColumnProductCategory = ({
                                                 editingKey,
                                                 setEditingKey,
                                                 UpdateData,
                                                 form
                                             }: EditingColumnProductCategoryProps) => {
    const isEditing = (record: ProductCategoryDataType) => record.id === editingKey;
    const edit = (record: Partial<ProductCategoryDataType> & { id: React.Key }) => {
        form.setFieldsValue({
            name: '',
            ...record
        });
        setEditingKey(record.id);
    };

    const columns = [
        {
            title: '#', dataIndex: 'id', editable: false, key: 'id',width: '5%'
        },
        {
            title: 'name', dataIndex: 'name', editable: true, key: 'name'
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            key: 'operation',
            width: '25%',
            render: (_: any, record: ProductCategoryDataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link key={`update${record.id}`} onClick={() => UpdateData(record.id)} style={{marginRight: 8}}>
                            Update
                        </Typography.Link>
                        <Popconfirm key={`cancel${record.id}`} title="Sure to cancel?" onConfirm={() => setEditingKey('')}>
                            Cancel
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link key={`edit${record.id}`} disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    return columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col, onCell: (record: ProductCategoryDataType) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                key: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    })
}