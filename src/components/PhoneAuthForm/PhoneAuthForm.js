/* eslint-disable import/no-anonymous-default-export */
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { Button, Form, Input, Select } from "antd"
import { useState } from "react"
import { authentication } from "../../firebase"
import { showErrorModal } from "../../utils/modals.utils"

export default () => {
  const [number, setNumber] = useState(8)
  const [OTP, setOTP] = useState('')
  const [isSendRequst, setIsSendRequest] = useState(false)
  const [isVisibleCaptcha, setIsvisibleCaptcha] = useState(false)
  const [expandForm, setExpandForm] = useState(false)

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="+8">+8</Select.Option>
        <Select.Option value="+7">+7</Select.Option>
      </Select>
    </Form.Item>
  )

  const generateRecaptcha = () => {
    setIsvisibleCaptcha(true)
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: (response) => {
        // капча решена, разрешаем отправку запроса.
        // console.log(response)
        setIsvisibleCaptcha(false)        // скрываем капчу после ее рашения
        setExpandForm(true)             // раскрываем форму
      },
    }, authentication)
  }

  const requestOTP = (values) => {
    setIsSendRequest(true)          // стейт: запрос отправлен
    generateRecaptcha()             // показываем капчу
    let appVerifier = window.recaptchaVerifier
    const phoneNumber = values.prefix + number
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult
    }).catch((error) => {
      // Error; SMS not sent
      console.error(error)
      showErrorModal("Ошибка аутентификации")
    })
  }

  const verifyOTP = (e) => {
    let otp = e.target.value
    setOTP(otp)
    
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult
      confirmationResult.confirm(otp).then((result) => {
        // const user = result.user
        // console.log('user:', user)
      }).catch((error) => {
        console.error(error)
        showErrorModal("Ошибка: неверный код")
      })
    }
  }

  return (
    <Form
      name="phone-auth"
      onFinish={requestOTP}
      initialValues={{
        prefix: "+7",
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
          {
            pattern: /^\d+$/,
            message: "Номер должен состоять из цифр",
          },
          {
            min: 10,
            message: "Неправильный номер телефона",
            validateTrigger: "onSubmit",
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
      {!isSendRequst &&
        <Button type="primary" htmlType="submit">
          Получить код в SMS
        </Button>
      }
      {expandForm && 
        <div className="phone-auth__confirm">
          <p>Пожалуйста введите код отправленный на ваш телефон</p>
          <Input type="number" placeholder="Код подтверждения" value={OTP} onChange={verifyOTP}/>
        </div>
      }
      <div hidden={!isVisibleCaptcha} id="recaptcha-container"></div>
    </Form>
  )
}
