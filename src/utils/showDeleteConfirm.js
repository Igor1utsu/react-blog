import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { deletePost } from '../store/slices/posts';
const { confirm } = Modal;

export const showDeleteConfirm = ( dispath, id ) => {
    confirm({
        title: 'Удалить пост?',
        icon: <ExclamationCircleOutlined style={{color: "red"}}/>,
        okText: 'Удалить',
        okType: 'danger',
        cancelText: 'Отмена',
        onOk() {
        console.log('OK');
        dispath ( deletePost(id) )      // запускаем код удаления из Redux
        },
        onCancel() {
        console.log('Cancel');
        },
    });
};