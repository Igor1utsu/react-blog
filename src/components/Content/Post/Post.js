/* eslint-disable import/no-anonymous-default-export */
import imgPlaceholder from '../../../assets/place-holder-img.png'
import { HeartIcon } from '../../HeartIcon/HeartIcon'
import { ReactComponent as TrashIcon } from "../../../assets/svg/trash.svg"
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg"
import "./Post.scss"
import { useHistory, useLocation } from 'react-router-dom'
import { selectIsLoggedin } from '../../../store/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../../store/slices/posts'
import { showDeleteConfirm } from '../../../utils/showDeleteConfirm'


export default ({ post, handleEditPost }) => {
        const { id, title, description, thumbnail, liked } = post
        const history = useHistory()
        const location = useLocation()
        const isLoggedIn = useSelector(selectIsLoggedin)    // загр. состояние авторизации из Redux
        const dispath = useDispatch()
        
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
                        <button className="btn--icon" onClick={() => dispath( likePost(post) )}>
                          <HeartIcon liked={liked} id={id}/>
                        </button>
                        <button className="btn--icon" onClick={() => showDeleteConfirm(dispath, id)}>
                          <TrashIcon className="icon"/>
                        </button>
                        <button className="btn--icon" onClick={handleEditPost}>
                          <EditIcon className="icon"/>
                        </button>
                      </nav>
                    }
                  </div>
                </div>
        )
}
