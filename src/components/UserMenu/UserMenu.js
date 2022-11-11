/* eslint-disable import/no-anonymous-default-export */
import { getAuth, signOut } from "firebase/auth"
import { useHistory } from "react-router-dom"
import "./UserMenu.scss"

export default ({ isVisibleUserMenu }) => {
    const history = useHistory()

    const clickLogOut = (e) => {
        e.preventDefault()
        const auth = getAuth()
        signOut(auth)               // вызываем функцию выхода из Firebase
        history.push('/login')
    }

    return (
        <div className={ isVisibleUserMenu ? 'user-menu user-menu-active' : 'user-menu' }>
            <div className="user-menu__avatar"></div>
            <div className="user-menu__link">Язык</div>
            <div className="user-menu__link user-menu__link--logout" onClick={(e) => clickLogOut(e)}>Выход</div>
        </div>
    )
}