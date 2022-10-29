import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
const { confirm } = Modal;

export const showDeleteConfirm = ( deleteCode ) => {
    confirm({
        title: 'Удалить пост?',
        icon: <ExclamationCircleOutlined style={{color: "red"}}/>,
        okText: 'Удалить',
        okType: 'danger',
        cancelText: 'Отмена',
        onOk() {
        console.log('OK');
        deleteCode()
        },
        onCancel() {
        console.log('Cancel');
        },
    });
};