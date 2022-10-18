import { NavLink } from "react-router-dom"
import "./SideBar.scss"

const SideBar = ({ popup }) => {
    return (
      <div className={ popup ? 'sidebar' : 'sidebar sidebar-hidde'}>
        <div className="sidebar__menu">
          <NavLink to="/blog" className="menu__link" activeClassName="menu__link--active">Blog</NavLink>
          <NavLink to="/favourites" className="menu__link" activeClassName="menu__link--active">Favourites</NavLink>
          <NavLink to="/settings" className="menu__link" activeClassName="menu__link--active">Settings</NavLink>
        </div>
      </div>
    )
}

export default SideBar