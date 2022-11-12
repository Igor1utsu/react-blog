import { Modal } from "antd"

export const modalErrorAuth = (message) => {
    Modal.error({
      content: message,
    })
  }