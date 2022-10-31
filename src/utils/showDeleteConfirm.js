import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
const { confirm } = Modal;

export const showDeleteConfirm = (onOK) => {
    confirm({
        title: 'Удалить пост?',
        icon: <ExclamationCircleOutlined style={{color: "red"}}/>,
        okText: 'Удалить',
        okType: 'danger',
        cancelText: 'Отмена',
        onOk() {
        console.log('OK');
        onOK()                  // функция удаления из хранилища Redux
        },
        onCancel() {
        console.log('Cancel');
        },
    });
};