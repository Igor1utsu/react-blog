import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button, Checkbox, Form, Input } from "antd"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import React from "react"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { modalErrorAuth } from "../../utils/modals/errorAuth"
import { ReactComponent as Logo } from "../../assets/svg/logo.svg"
import "./LoginForm.scss"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  const submit = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        history.push("./blog") // переходим на главную страницу
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error("Ошибка входа")
        if (errorMessage.includes("user-not-found")) {
          modalErrorAuth("Пользователь не найден")
        }
        if (errorMessage.includes("wrong-password")) {
          modalErrorAuth("Пароль неверный")
        }
      })
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={submit}
    >
      <div className="logo">
        <Logo className="logo__icon" />
      </div>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "email неправильный!",
            validateTrigger: "onSubmit", // когда показывать триггер с ошибкой
          },
          {
            required: true,
            message: "Введите ваш email пожалуйста!",
          },
          // () => ({
          //   validator(_, value) {
          //     console.log('errorSend', emailError)
          //     if (emailError) {
          //       return Promise.reject("Error!!!")
          //     }
          //     return Promise.resolve()
          //   },
          // }),
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Введите ваш пароль пожалуйста!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          type="password"
          placeholder="пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Сохранить вход</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" href="">
          Забыли пароль?
        </a> */}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
        <span className="span">или</span>
        <Link to="./register">Зарегистрироваться!</Link>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
