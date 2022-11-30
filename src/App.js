import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import Loading from './components/Loading/Loading'
import MainLayout from "./layouts/MainLayout"
import { AuthLayout } from './layouts/AuthLayout'
import NoMatch from "./pages/NoMatch/NoMatch"
import { URLS} from "./utils/constants"
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

  if (loadingAuth) return <Loading/>

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />     {/*  убираем слеш в конце адрессной строки  */}

      {URLS.AuthLayout.map((url, index) => {
        return (
          <Route exact path={url.path} key={index}>
            {isLoggedIn ? <Redirect to="/blog"/> : <AuthLayout/>}
          </Route>
        )
      })}

      {URLS.MainLayout.map((url, index) => {
        return (
          <Route exact path={url.path} key={index}>
            {isLoggedIn || !url.requiredLogin ? <MainLayout/> : <Redirect to='/login'/>}
          </Route>
        )
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