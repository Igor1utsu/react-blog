import { Button, Form, Input } from "antd"
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { showSuccessModal } from "../../utils/modals.utils"
import { modalErrorAuth } from "../../utils/modals/errorAuth"
import "./RegisterForm.scss"

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const RegisterForm = () => {
  const [form] = Form.useForm()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
      
  const handleSubmit = () => {
      const auth = getAuth()
      
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            return user
        })
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: user.email.split('@')[0]       // устнавливаем имя пользователя из E-mail
          })
          const message = 'Регистрация прошла успешно'
          showSuccessModal(message)                   // открываем модалку
        })
        .catch((error) => {
            // const errorCode = error.code
            const errorMessage = error.message
            console.error(errorMessage)
            if (errorMessage.includes("email-already-in-use")) {
              modalErrorAuth("Этот E-mail уже зарегистрирован")
            }
        })
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={handleSubmit}
    >
      <h3 className="title">Регистрация:</h3>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "email неправильный!",
          },
          {
            required: true,
            message: "Введите ваш email пожалуйста!",
          },
        ]}
      >
        <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: "Введите ваш пароль пожалуйста!",
          },
          {
            min: 6,
            message: "Длина пароля должна составлять минимум 6 симв.",
            validateTrigger: "onSubmit"
          },
        ]}
        hasFeedback
      >
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтвердите пароль"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Введите ваш пароль пожалуйста!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error("Пароли не совпадают!")
              )
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
        <span className="span">или</span>
        <Link to="./login">Войти</Link>
      </Form.Item>
    </Form>
  )
}
export default RegisterForm
