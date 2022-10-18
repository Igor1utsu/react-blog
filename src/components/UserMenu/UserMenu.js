/* eslint-disable import/no-anonymous-default-export */
import { useHistory } from "react-router-dom"
import "./UserMenu.scss"

export default ({ isVisibleUserMenu, setIsLoggedIn }) => {
    const history = useHistory()

    const logOut = (e) => {
        e.preventDefault()
        setIsLoggedIn(false)
        localStorage.removeItem('isLoggedIn')
        history.push('/login')
    }

    return (
        <div className={ isVisibleUserMenu ? 'user-menu user-menu-active' : 'user-menu' }>
            <div className="user-menu__avatar"></div>
            <div className="user-menu__link">Язык</div>
            <div className="user-menu__link user-menu__link--logout" onClick={(e) => logOut(e)}>Выход</div>
        </div>
    )
}