import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LoginPage from "./pages/LoginPage/LoginPage"
import MainLayout from "./layouts/MainLayout"
import NoMatch from "./pages/NoMatch/NoMatch"
import { URLS } from "./utils/constants"
import "./components/body.scss"
import "./components/btn.scss"


function App() {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('darkTheme') || false)   // Тема
  const [loginName, setLoginName] = useState(localStorage.getItem('login'))   // Логин
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))    // Статус: login / logout
  const [popup, setPopup] = useState(true)      // Popup menu on // off

  useEffect(() => {
    const root = document.documentElement
    root?.style.setProperty( "--color1", darkTheme ? "#141414" : "#e6e6e6" )      // Background
    root?.style.setProperty( "--color2", darkTheme ? "#262626" : "#f0f0f0" )      // Window
    root?.style.setProperty( "--color3", darkTheme ? "#0a0a0a" : "#1E90FF" )      // Header)
    root?.style.setProperty( "--btn-color1", darkTheme ? "#636363" : "#000" )      // Button)
    root?.style.setProperty( "--btn-color2", darkTheme ? "#1E90FF" : "#1E90FF" )      // Button)
    root?.style.setProperty( "--text-color1", darkTheme ? "#fff" : "#fff" )     // white
    root?.style.setProperty( "--text-color2", darkTheme ? "#b0b0b0" : "#636363" )  // body
    root?.style.setProperty( "--text-color3", darkTheme ? "#dedede" : "#000" )     // Title
    root?.style.setProperty( "--text-color4", darkTheme ? "#1E90FF" : "#1E90FF" )      // blue
    root?.style.setProperty( "--border-color", darkTheme ? "#474747" : "#a3a3a3" )    // border
    root?.style.setProperty( "--const-color1", "#fff" )

    if (darkTheme) {
      !localStorage.getItem('darkTheme') && localStorage.setItem('darkTheme', JSON.stringify(darkTheme))
    } else {
      localStorage.removeItem('darkTheme')
    }   // записываем или удаляем темы в локальном хранилище
  }, [darkTheme])

  const Page = () => {
    return (
      <MainLayout
        loginName={loginName} 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}

        
        popup={popup}
        setPopup={setPopup}
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
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

      {/* <Route exact path="/">
        <Redirect to="/blog"/>
      </Route> */}
      
      <Route path="*">
        <NoMatch/>
      </Route>
    </Switch>
  )
}

export default App