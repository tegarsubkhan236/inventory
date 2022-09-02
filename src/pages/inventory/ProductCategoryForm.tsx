import {Form, Input, Modal} from 'antd';
import React, {Dispatch, SetStateAction} from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>

interface ProductCategoryFormProps {
    visible: boolean,
    setVisible: Dispatcher<boolean>,
    confirmLoading: boolean,
    handleOk: (e: any) => void,
}

const ProductCategoryForm = ({visible, setVisible, confirmLoading, handleOk}: ProductCategoryFormProps) => {

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="Title"
            visible={visible}
            okButtonProps={{form: 'basic', htmlType: 'submit'}}
            confirmLoading={confirmLoading}
            onCancel={() => setVisible(false)}
        >
            <Form name="basic" labelCol={{span: 4}} wrapperCol={{span: 20}} onFinish={handleOk}
                  onFinishFailed={onFinishFailed}>
                <Form.Item label="Category" name="name" rules={[
                    {required: true, message: 'Please input your username!'}]
                }>
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ProductCategoryForm;