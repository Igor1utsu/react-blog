import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import Loading from './pages/Loading/Loading'
import LoginPage from "./pages/LoginPage/LoginPage"
import MainLayout from "./layouts/MainLayout"
import NoMatch from "./pages/NoMatch/NoMatch"
import PhoneAuth from './pages/PhoneAuth/PhoneAuth'
import Register from './pages/Register/Register'
import { URLS } from "./utils/constants"
import 'antd/dist/antd.css'
import "./components/body.scss"
import "./components/btn.scss"
import { useLoadAuth, useThemeStyle } from './utils/hooks'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from './store/slices/auth'


function App() {
  useThemeStyle()   // загружаем тему оформления
  const loadingAuth = useLoadAuth()     // загружаем данные авторизации Firebase
  const isLoggedIn = useSelector(getIsLoggedIn)    // извлекаем состояние авторизации из Redux
  const { pathname } = useLocation()

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

  if (loadingAuth) return <Loading/>

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />     {/*  убираем слеш в конце адрессной строки  */}

      <Route exact path="/login">
        {isLoggedIn ? <Redirect to="/blog"/> : <Login/>}
      </Route>

      <Route exact path="/phone-auth">
        {isLoggedIn ? <Redirect to="/blog"/> : <PhoneAuth/>}
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