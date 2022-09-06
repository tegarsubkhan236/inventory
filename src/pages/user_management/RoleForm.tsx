import {Form, Input, Modal} from 'antd';
import React, {Dispatch, SetStateAction} from "react";
import {RoleDataType} from "../../data/roleData";

type Dispatcher<S> = Dispatch<SetStateAction<S>>

interface RoleFormProps {
    id : React.Key|undefined
    title: string,
    visible: boolean,
    setVisible: Dispatcher<boolean>,
    confirmLoading: boolean,
    handleOk: (values: RoleDataType) => void,
}

const RoleForm = ({id, title, visible, setVisible, confirmLoading, handleOk}: RoleFormProps) => {

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title={ id !== undefined ? `${title} Edit Data` :`${title} Add Data`}
            visible={visible}
            okButtonProps={{form: 'basic', htmlType: 'submit'}}
            confirmLoading={confirmLoading}
            onCancel={() => setVisible(false)}
        >
            <Form name="basic" labelCol={{span: 4}} wrapperCol={{span: 20}} onFinish={handleOk}
                  onFinishFailed={onFinishFailed}>
                <Form.Item label="Name" name="name" rules={[
                    {required: true, message: 'Please input your username!'}]
                }>
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RoleForm;