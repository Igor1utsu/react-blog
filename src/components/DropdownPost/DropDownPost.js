/* eslint-disable import/no-anonymous-default-export */
import { Dropdown, Menu } from "antd"
import { useDispatch } from "react-redux"
import { addBookmark, deleteBookmark } from '../../store/actions/bookmarks'
import { useFavourites } from "../../utils/hooks"
import "./DropDownPost.scss"

export default ({ id, bookmark, handleEditPost}) => {
    const { isBookmarks } = useFavourites()
    const dispath = useDispatch()
    
    const menu = (
        <Menu>
            {bookmark && <Menu.Item key={0} onClick={() => dispath( deleteBookmark(bookmark.id) )}>Удалить из закладок</Menu.Item>}
            {!bookmark && <Menu.Item key={1} onClick={() => dispath( addBookmark(id) )}>Сохранить в закладках</Menu.Item>}
            {!isBookmarks && <Menu.Item key={2} onClick={handleEditPost}>Редактировать запись</Menu.Item>}
        </Menu>
    )

  return <Dropdown.Button className="drop-down" overlay={menu}/>
}