import { NavLink } from "react-router-dom"
import "./SideBar.scss"


const SideBar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          <NavLink to="/blog" className="menu__link" activeClassName="menu__link--active">Блог</NavLink>
          <NavLink to="/favourites" className="menu__link" activeClassName="menu__link--active">Избранное</NavLink>
          <NavLink to="/bookmarks" className="menu__link" activeClassName="menu__link--active">Закладки</NavLink>
          <NavLink to="/settings" className="menu__link" activeClassName="menu__link--active">Настройки</NavLink>
        </div>
      </div>
    )
}

export default SideBar