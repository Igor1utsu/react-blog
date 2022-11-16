/* eslint-disable import/no-anonymous-default-export */

import { Button, Form, Input, Select } from "antd"
import { useState } from "react"

export default () => {
  const [number, setNumber] = useState(8)

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="8">+8</Select.Option>
        <Select.Option value="7">+7</Select.Option>
      </Select>
    </Form.Item>
  )

  const handleSubmit = (values) => {
    console.log(values.prefix)
    console.log(number)
  }

  return (
    <Form
      name="phone-auth"
      onFinish={handleSubmit}
      initialValues={{
        prefix: "7",
      }}
      scrollToFirstError
    >
      <h3 className="title">Вход по номеру телефона</h3>

      <Form.Item
        name="phone"
        label="Номер телефона"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите номер вашего телефона!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Получить код в SMS
      </Button>
      <div className="phone-auth__confirm">
        <p>Пожалуйста введите код отправленный на ваш телефон</p>
        <Input type="number" placeholder="Код подтверждения" />
      </div>
    </Form>
  )
}
