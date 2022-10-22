/* eslint-disable import/no-anonymous-default-export */
import imgPlaceholder from '../../../assets/place-holder-img.png'
import { ReactComponent as LikeIcon } from "../../../assets/svg/liked.svg"
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash.svg"
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg"
import "./Post.scss"
import { useHistory, useLocation } from 'react-router-dom'
import { selectIsLoggedin } from '../../../store/slices/auth'
import { useSelector } from 'react-redux'


export default ({ id, title, description, thumbnail, liked, likePost, deletePost, editPost }) => {
        const history = useHistory()
        const location = useLocation()
        const isLoggedIn = useSelector(selectIsLoggedin)    // загр. состояние авторизации из Redux
        
        return (
                <div className="post" onClick={() => history.push(`${location.pathname}/${id}`)}>
                  <div className="post__logo-wrapper">
                    <img src={thumbnail || imgPlaceholder} className="post__logo"/>
                  </div>
                  <div className="post__content">
                    <h3 className="post__title">{title}</h3>
                    <div className="post__description">{description}</div>
                    {isLoggedIn && 
                      <nav className="application" onClick={(e) => {e.stopPropagation()}}>
                        <button className="btn--icon" onClick={likePost}>
                          <LikeIcon className={liked ? "icon icon-liked" : "icon"}/>
                        </button>
                        <button className="btn--icon" onClick={deletePost} >
                          <TrashIcon className="icon"/>
                        </button>
                        <button className="btn--icon" onClick={editPost}>
                          <EditIcon className="icon"/>
                        </button>
                      </nav>
                    }
                  </div>
                </div>
        )
}
