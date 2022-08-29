import {Button, Modal, PageHeader, Table} from 'antd';
import {useState} from 'react'
import {UserData} from "../../../data/UserData";

const User = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const {userColumns, userRecord} = UserData()

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
                    <Table columns={userColumns} dataSource={userRecord}/>
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
