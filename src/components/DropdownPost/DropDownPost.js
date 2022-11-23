/* eslint-disable import/no-anonymous-default-export */
import { Dropdown, Menu } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { addBookmark, deleteBookmark } from '../../store/actions/bookmarks'
import { getIsLoggedIn } from "../../store/slices/auth"
import { useFavourites } from "../../utils/hooks"
import "./DropDownPost.scss"

export default ({ id, bookmark, handleEditPost, handleDeletePost }) => {
    const isLoggedIn = useSelector(getIsLoggedIn)    // извлекаем состояние авторизации из Redux
    const { isBookmarks } = useFavourites()
    const dispath = useDispatch()
    
    const menu = (
        <Menu>
            {isLoggedIn && bookmark && <Menu.Item key={0} onClick={() => dispath( deleteBookmark(bookmark.id) )}>Удалить из закладок</Menu.Item>}
            {isLoggedIn && !bookmark && <Menu.Item key={1} onClick={() => dispath( addBookmark(id) )}>Сохранить в закладках</Menu.Item>}
            {isLoggedIn && !isBookmarks && <Menu.Item key={2} onClick={handleEditPost}>Редактировать запись</Menu.Item>}
            {isLoggedIn && !isBookmarks && <Menu.Item key={3} onClick={handleDeletePost}>Удалить запись</Menu.Item>}
        </Menu>
    )

  return <Dropdown.Button className="drop-down" overlay={menu}/>
}