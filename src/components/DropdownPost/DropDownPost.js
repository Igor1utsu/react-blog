/* eslint-disable import/no-anonymous-default-export */
import { Dropdown, Menu } from "antd"
import { useDispatch } from "react-redux"
import { addBookmark, deleteBookmark } from '../../store/actions/bookmarks'
import "./DropDownPost.scss"

export default ({ id, bookmark }) => {
    const dispath = useDispatch()
    
    const menu = (
        <Menu>
            {bookmark && <Menu.Item key={0} onClick={() => dispath( deleteBookmark(bookmark.id) )}>Удалить из закладок</Menu.Item>}
            {!bookmark && <Menu.Item key={1} onClick={() => dispath( addBookmark(id) )}>Сохранить в закладках</Menu.Item>}
        </Menu>
    )

  return <Dropdown.Button className="drop-down" overlay={menu}/>
}