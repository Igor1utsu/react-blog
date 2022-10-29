import { useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import LoginPage from "./pages/LoginPage/LoginPage"
import MainLayout from "./layouts/MainLayout"
import NoMatch from "./pages/NoMatch/NoMatch"
import { URLS } from "./utils/constants"
import 'antd/dist/antd.css'
import "./components/body.scss"
import "./components/btn.scss"
import { useThemeStyle } from './utils/hooks'


function App() {
  useThemeStyle()   // загружаем тему оформления
  const [loginName, setLoginName] = useState(localStorage.getItem('login'))   // Логин
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))    // Статус: login / logout
  const { pathname } = useLocation()

  const Page = () => {
    return (
      <MainLayout
        loginName={loginName} 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    )
  }

  const Login = () => {
    return (
      <LoginPage 
        loginName={loginName} 
        setLoginName={setLoginName}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    )
  }

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />     {/*  убираем слеш в конце адрессной строки  */}

      <Route exact path="/login">
        {isLoggedIn ? <Redirect to="/blog"/> : <Login/>}
      </Route>
      
      {URLS.map((url, index) => {
        return  <Route 
                  key={index}
                  path={url.path}
                  render={() => {
                    if (isLoggedIn || !url.requiredLogin) return Page() // если авторизированны или не требует авторизации выводим контент
                    return <Redirect to='/login'/>
                  }}
                />
      })}

      <Route exact path="/">
        <Redirect to="/blog"/>
      </Route>
      
      <Route path="*">
        <NoMatch/>
      </Route>
    </Switch>
  )
}

export default App