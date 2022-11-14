import { Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import confirm from "antd/lib/modal/confirm"

export const showSuccessModal = (message) => {
  Modal.success({
    content: message,
  })
}

export const showErrorModal = (message) => {
  Modal.error({
    content: message,
  })
}

export const showDeleteConfirm = (onOK) => {
  confirm({
    title: "Удалить пост?",
    icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
    okText: "Удалить",
    okType: "danger",
    cancelText: "Отмена",
    onOk() {
      console.log("OK")
      onOK() // функция удаления из хранилища Redux
    },
    onCancel() {
      console.log("Cancel")
    },
  })
}
