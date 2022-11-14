import { Modal } from "antd"

export const showSuccessModal = (message) => {
  Modal.success({
    content: message,
  })
}