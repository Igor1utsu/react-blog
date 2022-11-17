/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react"
import "./Header.scss"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../../src/assets/svg/logo.svg"
import { ReactComponent as ToggleSideBar } from "../../../src/assets/svg/toogle-sidebar.svg"
import { ReactComponent as ArrowDown } from "../../../src/assets/svg/arrow--down.svg"
import UserMenu from "../UserMenu/UserMenu"
import { useIsHiddeSideBar, useOutsideAlerter, useThemeStyle } from "../../utils/hooks"
import { useSelector } from "react-redux"
import { getUser, getIsLoggedIn } from "../../store/slices/auth"
import { useRef } from "react"


export default ( props ) => {
    const { displayName, uid } = useSelector(getUser)             // загружаем данные о пользователе из Redux
    const isLoggedIn = useSelector(getIsLoggedIn)    // извлекаем состояние авторизации из Redux
    const [isVisibleUserMenu, setIsVisibleUserMenu] = useState(false) // Открытие меню Пользователя
    const { darkTheme, setDarkTheme } = useThemeStyle()
    const { handleToggleSideBar } = useIsHiddeSideBar()   // скрываем / показываем боковую панель
    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef, () => setIsVisibleUserMenu(false))        // функция отслеживания клика

    return (
      <>
        <header className="header">
          <div className="container">
            <div className="header__row">
                  <>
                    <button className="btn--toggle-sidebar">
                      <ToggleSideBar className="header__icon" onClick={(e) => handleToggleSideBar(e)}/>
                    </button>
                    <div className="header__logo">
                      <Logo className="header__icon"/>
                      <span className="header-logo__title">React</span>
                    </div>
                    {isLoggedIn ? (
                      <>
                        <div className="form-switcher">
                          <input type="checkbox" name="switcher-name" id="switcher-id" checked={darkTheme} onChange={() => setDarkTheme(!darkTheme)}/>
                          <label className="switcher" htmlFor="switcher-id"></label>
                        </div>
                        <div className="header-login__wrapper" onClick={() => setIsVisibleUserMenu(!isVisibleUserMenu)} ref={wrapperRef}>
                          <span className="header-login__name">{displayName || uid}</span>
                          <ArrowDown className="header-login__arrow"/>
                          <UserMenu isVisibleUserMenu={isVisibleUserMenu} />
                          {props.children}
                        </div>
                      </>
                    ) : (
                      <Link to="./login" className="header__link">Войти</Link>
                    )}
                  </>
            </div>
          </div>
        </header>
      </>
    )
  }