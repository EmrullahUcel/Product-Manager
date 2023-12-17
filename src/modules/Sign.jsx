import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, whoIsLogin } from '../redux/SalesSlice'
import { account } from '../db/appwrite'
import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './pages.css'
import { setUser } from '../redux/auth'

const Sign = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    try {
      await account.createEmailSession(email, password)
      const data = await account.get()
      dispatch(setUser(data))
      dispatch(whoIsLogin(data.email ))
    } catch (error) {
      console.error(error)
      dispatch(setUser(null))
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <Form name="normal_login" className="login-form" onFinish={handleLogin}>
          <h2>Kullanıcı Girişi</h2>
          <Form.Item name="email">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E mail"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              placeholder="Parola"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Sign
