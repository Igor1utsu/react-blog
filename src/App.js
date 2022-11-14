import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import LoginPage from "./pages/LoginPage/LoginPage"
import MainLayout from "./layouts/MainLayout"
import NoMatch from "./pages/NoMatch/NoMatch"
import Register from './pages/Register/Register'
import { URLS } from "./utils/constants"
import 'antd/dist/antd.css'
import "./components/body.scss"
import "./components/btn.scss"
import { useThemeStyle } from './utils/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, getIsLoggedIn, setUser } from './store/slices/auth'
import { getAuth } from "firebase/auth"
import { useEffect } from 'react'



function App() {
  useThemeStyle()   // загружаем тему оформления
  const isLoggedIn = useSelector(getIsLoggedIn)    // извлекаем состояние авторизации из Redux
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user.providerData[0]))
      } 
      else { 
        console.log("Выход из системы")
        dispatch(removeUser())
      } 
    })
  },[])

  const Page = () => {
    return (
      <MainLayout/>
    )
  }

  const Login = () => {
    return (
      <LoginPage/>
    )
  }

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />     {/*  убираем слеш в конце адрессной строки  */}

      <Route exact path="/login">
        {isLoggedIn ? <Redirect to="/blog"/> : <Login/>}
      </Route>

      <Route exact path="/register">
        {isLoggedIn ? <Redirect to="/blog"/> : <Register/>}
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