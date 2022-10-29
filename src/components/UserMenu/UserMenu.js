/* eslint-disable import/no-anonymous-default-export */
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { logOut } from "../../store/slices/auth"
import "./UserMenu.scss"

export default ({ isVisibleUserMenu }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const clickLogOut = (e) => {
        e.preventDefault()
        history.push('/login')      // переход на страницу авторизации
        dispatch(logOut())      // вызываем функцию выхода из хранилища Redux
    }

    return (
        <div className={ isVisibleUserMenu ? 'user-menu user-menu-active' : 'user-menu' }>
            <div className="user-menu__avatar"></div>
            <div className="user-menu__link">Язык</div>
            <div className="user-menu__link user-menu__link--logout" onClick={(e) => clickLogOut(e)}>Выход</div>
        </div>
    )
}