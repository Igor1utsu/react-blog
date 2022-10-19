import { NavLink } from "react-router-dom"
import "./SideBar.scss"


const SideBar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          <NavLink to="/blog" className="menu__link" activeClassName="menu__link--active">Blog</NavLink>
          <NavLink to="/favourites" className="menu__link" activeClassName="menu__link--active">Favourites</NavLink>
          <NavLink to="/settings" className="menu__link" activeClassName="menu__link--active">Settings</NavLink>
        </div>
      </div>
    )
}

export default SideBar