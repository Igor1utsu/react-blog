/* eslint-disable import/no-anonymous-default-export */
import imgPlaceholder from '../../../assets/place-holder-img.png'
import { HeartIcon } from '../../HeartIcon/HeartIcon'
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash.svg"
import "./Post.scss"
import { useHistory, useLocation } from 'react-router-dom'
import { getIsLoggedIn } from '../../../store/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost } from '../../../store/slices/posts'
import { showDeleteConfirm } from '../../../utils/modals.utils'
import DropDownPost from '../../DropdownPost/DropDownPost'
import { getBookmarks } from '../../../store/reducers/bookmarksReducer'
import { useMemo } from 'react'



export default ({ post, setSelectPost, setIsVisibleForm }) => {
        const { id, title, description, thumbnail, liked } = post
        const bookmarkList = useSelector(getBookmarks)                        // извлекаем список закладок из Redux
        const bookmark = useMemo(() => bookmarkList.find(bookmark => bookmark.postID === post.id), [bookmarkList, post.id])   // есть пост в закладках?
        const history = useHistory()
        const location = useLocation()
        const isLoggedIn = useSelector(getIsLoggedIn)    // загр. состояние авторизации из Redux
        const dispath = useDispatch()

        const handleLikePost = (e) => {         // лайк поста
          e.preventDefault()
          dispath( likePost(post) )
        }

        const handleDeletePost = (e) => {       // удаление поста
          e.preventDefault()
          const onOk = () => dispath( deletePost(id) )
          showDeleteConfirm(onOk)
        }

        const handleEditPost= () => {          // редактирования поста
          setSelectPost(post)       // заносим текущий пост в стейт
          setIsVisibleForm(true)      // открываем форму
        }
        
        return (
                <div className="post">
                  <div className="post__logo-wrapper">
                    <img src={thumbnail || imgPlaceholder} className="post__logo"/>
                  </div>
                  <div className="post__content">
                    <div className="post__header">
                      <h3 className="post__title">{title}</h3>
                      <DropDownPost id={id} bookmark={bookmark} handleEditPost={handleEditPost}/>
                    </div>
                    <div className="post__description" onClick={() => history.push(`${location.pathname}/${id}`)}>{description}</div>
                    {isLoggedIn && 
                      <nav className="application" onClick={(e) => {e.stopPropagation()}}>
                          <button className="btn--application btn--application-liks" onClick={(e) => handleLikePost(e)}>
                            <HeartIcon liked={liked} id={id}/>
                            <div className="liks__num" style={liked ? {visibility: "visible"} : {visibility: "hidden"}}>{liked ? "1" : "0"}</div>
                          {/* <div className="like__num" style={liked.length ? {visibility: "visible"} : {visibility: "hidden"}}>{liked.length}</div> */}
                          </button>
                        <button className="btn--application" onClick={(e) => handleDeletePost(e)}>
                          <TrashIcon className="icon"/>
                        </button>
                      </nav>
                    }
                  </div>
                </div>
        )
}
