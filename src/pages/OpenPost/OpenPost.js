/* eslint-disable import/no-anonymous-default-export */
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import imgPlaceholder from '../../../src/assets/place-holder-img.png'
import { ReactComponent as TrashIcon } from "../../../src/assets/svg/trash.svg"
import { HeartIcon } from '../../components/HeartIcon/HeartIcon'
import { ReactComponent as EditIcon } from "../../../src/assets/svg/edit.svg"
import './OpenPost.scss'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useMemo } from 'react';
import { PostDesc, PostTitle } from '../../components/PostData/PostData'
import  PostNotFound from '../../pages/PostNotFound/PostNotFound'
import { useFavourites, useNavigationPost } from '../../utils/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/slices/auth'
import { deletePost, likePost, savePost, selectPostsData } from '../../store/slices/posts'
import { showDeleteConfirm } from '../../utils/modals.utils';

export default () => {
    const isLoggedIn = useSelector(getIsLoggedIn)        // извлекаем состояние авторизации из Redux
    const isFavourites = useFavourites()                    // загружаем функционал для избранного
    const params = useParams()
    const [formData, setFormData] = useState({})
    const { postList } = useSelector(selectPostsData)               // извлекае массив из хранилища Redux    
    const post = useMemo(() => postList.find(post => post.id === params.id), [params.id, postList])       // ищим в массиве текущий пост
    const { prevPost, nextPost, prevPostHistory, nextPostHistory, blogHistory } = useNavigationPost(postList, isFavourites)    // загружаем функционал навигации
    const { id, title, description, thumbnail, liked } = post || {}
    const [isEditForm, setIsEditForm] = useState(false)                 // форма редактирования
    const dispath = useDispatch()  

    const onValuesChange = (fielData) => {          //   Данные для Инпутов
        setFormData({...formData, ...fielData})
    }

    const saveChanges = (event) => {            // функция сохранения изменения в посте
        event.preventDefault()
        const dataPost = {
            ...post,
            title: formData?.title,
            description: formData?.description,
            thumbnail: formData?.imgSrc
        }
        dispath( savePost(dataPost) )
        setIsEditForm(false)
    }

    const handleLikePost = (e) => {         // лайк поста
        e.preventDefault()
        dispath( likePost(post) )
    }

    const handleDeletePost = (e) => {       // удаление поста
        e.preventDefault()
        const onOk = async () => {
            await dispath( deletePost(id) )
            blogHistory()
        }
        showDeleteConfirm(onOk)
    }

    const handleEditPost= (e) => {          // открытие формы редактирования поста
        e.preventDefault()
        setIsEditForm(true)
    }
    
    if (!post?.id) return <PostNotFound/>
    
    return (
        <div className="overlay">
        <div className='box'>
            {prevPost && 
                <nav className="box__nav box__nav-prev" onClick={() => prevPostHistory()}>
                    <LeftOutlined className='box-nav__arrow'/>
                </nav>
            }
            <div className="openpost">
                <div className="openpost__logo-wrapper">
                    <img src={thumbnail || imgPlaceholder} className="openpost__logo"/>
                </div>
                <div className="openpost__content">
                    <PostTitle 
                        {...post}
                        isEditForm={isEditForm}
                        onValuesChange={onValuesChange}
                    />
                    <PostDesc
                        {...post}
                        isEditForm={isEditForm}
                        onValuesChange={onValuesChange}
                    />
                    {isEditForm && <button className='btn' onClick={(e) => saveChanges(e)}>Сохранить</button>}     {/*  если редактируем пост, то показываем кнопку  */}  
                    {isLoggedIn && !isEditForm &&
                        <nav className="application">
                            <button className="btn--application btn--application-liks" onClick={(e) => handleLikePost(e)}>
                                <HeartIcon liked={liked} id={id}/>
                                <div className="liks__num" style={liked ? {visibility: "visible"} : {visibility: "hidden"}}>{liked ? "1" : "0"}</div>
                            </button>
                            <button className="btn--application" onClick={(e) => handleDeletePost(e)} >
                                <TrashIcon className="icon"/>
                            </button>
                            <button className="btn--application" onClick={(e) => handleEditPost(e)}>
                                <EditIcon className="icon"/>
                            </button>
                        </nav>
                    }       {/* показываем application только при авториизации, и скрываем когда редактируем */}
                </div>
            </div>
            {nextPost &&
                <nav className="box__nav box__nav-next" onClick={() => nextPostHistory()}>
                    <RightOutlined className='box-nav__arrow'/>
                </nav>
            }
            <nav className='box__close' onClick={() => blogHistory()}>
                <CloseOutlined className='box-close__icon'/>
            </nav>
        </div>
        </div>
    )
}