/* eslint-disable import/no-anonymous-default-export */
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import imgPlaceholder from '../../../src/assets/place-holder-img.png'
import { ReactComponent as TrashIcon } from "../../../src/assets/svg/trash.svg"
import { HeartIcon } from '../../components/HeartIcon/HeartIcon'
import { ReactComponent as EditIcon } from "../../../src/assets/svg/edit.svg"
import './OpenPost.scss'
import { useHistory, useParams } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { useEffect } from 'react';
import { PostDesc, PostTitle } from '../../components/PostData/PostData'
import  PostNotFound from '../../pages/PostNotFound/PostNotFound'
import { useFavourites } from '../../utils/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedin } from '../../store/slices/auth'
import { deletePost, likePost, savePost, selectPostsData } from '../../store/slices/posts'
import { showDeleteConfirm } from '../../utils/showDeleteConfirm'

export default () => {
    const isLoggedIn = useSelector(selectIsLoggedin)        // извлекаем состояние авторизации из Redux
    const isFavourites = useFavourites()                    // загружаем функционал для избранного
    const params = useParams()
    const [formData, setFormData] = useState({})
    const { postList } = useSelector(selectPostsData)               // извлекае массив из хранилища Redux    
    const post = postList.find(post => post.id === params.id)       // ищим в массиве текущий пост
    const prevPost = postList[(postList.findIndex(post => post.id === params.id)) - 1]    // предыдущий пост в навигации
    const nextPost = postList[(postList.findIndex(post => post.id === params.id)) + 1]    // следующий пост в навигации
    const { id, title, description, thumbnail, liked } = post || {}
    const [isEditForm, setIsEditForm] = useState(false)                 // форма редактирования
    const history = useHistory()
    const dispath = useDispatch()  

    const onKeypress = useCallback((e) => {
        if(e.key === 'ArrowLeft' && prevPost ){
            e.preventDefault()
            history.push(isFavourites ? `/favourites/${prevPost.id}` : `/blog/${prevPost.id}`)
        }
        if(e.key === 'ArrowRight' && nextPost){
            e.preventDefault()
            history.push(isFavourites ? `/favourites/${nextPost.id}` : `/blog/${nextPost.id}`)
        }
    }, [history, isFavourites, nextPost, prevPost])

    useEffect(() => {
        document.addEventListener("keydown", onKeypress)                    // добавление обработки события при нажатия клавиш
        return () => document.removeEventListener("keydown", onKeypress)    // удаление прослушивателя событий
    }, [onKeypress])

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
            history.push(isFavourites ? '/favourites' : '/blog')
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
                <nav className="box__nav box__nav-prev" onClick={() => history.push(isFavourites ? `/favourites/${prevPost.id}` : `/blog/${prevPost.id}`)}>
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
                            <button className="btn--icon" onClick={(e) => handleLikePost(e)}>
                                <HeartIcon liked={liked} id={id}/>
                            </button>
                            <button className="btn--icon" onClick={(e) => handleDeletePost(e)} >
                                <TrashIcon className="icon"/>
                            </button>
                            <button className="btn--icon" onClick={(e) => handleEditPost(e)}>
                                <EditIcon className="icon"/>
                            </button>
                        </nav>
                    }       {/* показываем application только при авториизации, и скрываем когда редактируем */}
                </div>
            </div>
            {nextPost &&
                <nav className="box__nav box__nav-next" onClick={() => history.push(isFavourites ? `/favourites/${nextPost.id}` : `/blog/${nextPost.id}`)}>
                    <RightOutlined className='box-nav__arrow'/>
                </nav>
            }
            <nav className='box__close' onClick={() => history.push(isFavourites ? '/favourites' : '/blog')}>
                <CloseOutlined className='box-close__icon'/>
            </nav>
        </div>
        </div>
    )
}