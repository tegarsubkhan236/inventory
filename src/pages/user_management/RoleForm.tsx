import {Form, Input, message, Modal} from 'antd';
import React, {Dispatch, SetStateAction} from "react";
import {RoleDataType} from "../../data/roleData";

type Dispatcher<S> = Dispatch<SetStateAction<S>>

interface RoleFormProps {
    id : React.Key|undefined
    setId : Dispatcher<React.Key|undefined>
    item : RoleDataType|undefined
    setItem: Dispatcher<RoleDataType|undefined>
    title: string,
    visible: boolean,
    setVisible: Dispatcher<boolean>,
    confirmLoading: boolean,
    handleSave: (values: RoleDataType) => void,
    handleUpdate: (values: RoleDataType, id : React.Key) => void,
}

const RoleForm = ({id, setId, item, setItem, title, visible, setVisible, confirmLoading, handleSave, handleUpdate}: RoleFormProps) => {

    const onFinish = async (values : RoleDataType) => {
      if (id !== undefined){
          await handleUpdate(values, id)
          setId(undefined)
          setItem(undefined)
      } else {
          await handleSave(values)
      }
    }
    const onFinishFailed = async (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('The Operation failed to execute')
    };
    const onCancel = async () => {
        setVisible(false)
        setId(undefined)
        setItem(undefined)
        message.warning('You cancel the operation')
    }

    return (
        <Modal
            title={ id !== undefined ? `${title} Edit Data` :`${title} Add Data`}
            visible={visible}
            okButtonProps={{form: 'basic', htmlType: 'submit'}}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <Form name="basic" labelCol={{span: 4}} wrapperCol={{span: 20}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Name" name="name" initialValue={item !== undefined ? item.name : ''} rules={[
                    {required: true, message: "Don't leave this empty!"}]
                }>
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RoleForm;
