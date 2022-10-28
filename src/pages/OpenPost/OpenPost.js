/* eslint-disable import/no-anonymous-default-export */
import imgPlaceholder from '../../../src/assets/place-holder-img.png'
import { ReactComponent as TrashIcon } from "../../../src/assets/svg/trash.svg"
import { HeartIcon } from '../../components/HeartIcon/HeartIcon'
import { ReactComponent as EditIcon } from "../../../src/assets/svg/edit.svg"
import { ReactComponent as CloseIcon } from "../../../src/assets/svg/close-button.svg"
import './OpenPost.scss'
import { API } from '../../utils/api'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { PostDesc, PostTitle } from '../../components/PostData/PostData'
import  PostNotFound from '../../pages/PostNotFound/PostNotFound'
import { useFavourites } from '../../utils/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedin } from '../../store/slices/auth'
import { deletePost, likePost, selectPostsData, updatePosts } from '../../store/slices/posts'

export default () => {
    const isLoggedIn = useSelector(selectIsLoggedin)        // извлекаем состояние авторизации из Redux
    const isFavourites = useFavourites()                    // загружаем функционал для избранного
    const params = useParams()
    const [formData, setFormData] = useState({})
    const { postList } = useSelector(selectPostsData)               // извлекае массив из хранилища Redux    
    const post = postList.find(post => post.id === params.id)       // ищим в массиве текущий пост
    const { id, title, description, thumbnail, liked } = post || {}
    const [isEdit, setIsEdit] = useState(false)
    const history = useHistory()
    const dispath = useDispatch()  
    
    //   Данные для Инпутов
    const onValuesChange = (fielData) => {
        setFormData({...formData, ...fielData})
    }
    
    // Сохранение изменений
    const editSelectPost = (event) => {
        event.preventDefault()

        const editablePost = {
            ...post,
            title: formData.title,
            description: formData.description,
            //   thumbnail: imgSrcInput
        }

        API.updatePostByID(editablePost)
            //   .catch((er) => errorSendForm(er))
            .then((data) => {
            dispath( updatePosts())
            setIsEdit(false)
        })
    }
    
    if (!post?.id) return <PostNotFound/>
    
    return (
        <div className="overlay">
            <div className="openpost">
                <button className="btn--close" onClick={() => history.push(isFavourites ? '/favourites' : '/blog')}>
                    <CloseIcon className="icon"/>
                </button>
                <div className="openpost__logo-wrapper">
                    <img src={thumbnail || imgPlaceholder} className="openpost__logo"/>
                </div>
                <div className="openpost__content">
                    <PostTitle 
                        {...post}
                        isEdit={isEdit}
                        onValuesChange={onValuesChange}
                    />
                    <PostDesc
                        {...post}
                        isEdit={isEdit}
                        onValuesChange={onValuesChange}
                    />
                    {isEdit && <button className='btn' onClick={(e) => editSelectPost(e)}>Сохранить</button>}     {/*  если редактируем пост, то показываем кнопку  */}  
                    {isLoggedIn && !isEdit &&
                        <nav className="application">
                            <button className="btn--icon" onClick={() => dispath( likePost(post) )}>
                                <HeartIcon liked={liked} id={id}/>
                            </button>
                            <button className="btn--icon" onClick={() => dispath( deletePost(id) )} >
                                <TrashIcon className="icon"/>
                            </button>
                            <button className="btn--icon" onClick={() => setIsEdit(true)}>
                                <EditIcon className="icon"/>
                            </button>
                        </nav>
                    }       {/* показываем application только при авториизации, и скрываем когда редактируем */}
                </div>
            </div>
        </div>
    )
}