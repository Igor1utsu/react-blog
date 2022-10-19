/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react"
import "./Header.scss"
import { useHistory, useLocation } from "react-router-dom"
import { ReactComponent as Logo } from "../../../src/assets/svg/logo.svg"
import { ReactComponent as PopupMenu } from "../../../src/assets/svg/popup.svg"
import { ReactComponent as ArrowDown } from "../../../src/assets/svg/arrow--down.svg"
import UserMenu from "../UserMenu/UserMenu"
import { useThemeStyle } from "../../utils/hooks"


export default ({ loginName, setIsLoggedIn, popup, setPopup }) => {
    const location = useLocation()
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const islocationLogin = location.pathname === '/login'
    const [isVisibleUserMenu, setIsVisibleUserMenu] = useState(false) // Открытие меню Пользователя
    const history = useHistory()
    const { darkTheme, setDarkTheme } = useThemeStyle()


    return (
      <>
        <header className="header">
          <div className="container">
            <div className="header__row">
              {isLoggedIn ? (
                  <>
                    <button className="btn--popup">
                      <PopupMenu className="header__icon" fill="#fff" onClick={() => setPopup(!popup)}/>
                    </button>
                    <div className="header__logo">
                      <Logo className="header__icon" fill="#fff"/>
                      <span className="header-logo__title">React</span>
                    </div>

                    <div className="form-switcher">
                      <input type="checkbox" name="switcher-name" id="switcher-id" checked={darkTheme} onChange={() => setDarkTheme(!darkTheme)}/>
                      <label className="switcher" htmlFor="switcher-id"></label>
                    </div>

                    <div className="header-login__wrapper" onClick={() => setIsVisibleUserMenu(!isVisibleUserMenu)}>
                      <span className="header-login__name">{loginName}</span>
                      <ArrowDown className="header-login__arrow" fill="#fff"/>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="header__greeting">Добро пожаловать, гость!</div>
                    {!islocationLogin && <button className="btn--login" onClick={() => history.push('/login')}>Войти</button>}
                  </>
                )
              }
            </div>
          </div>
        </header>
        <UserMenu 
          isVisibleUserMenu={isVisibleUserMenu} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      </>
    )
  }