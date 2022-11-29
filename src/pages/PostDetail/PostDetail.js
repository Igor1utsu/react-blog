/* eslint-disable import/no-anonymous-default-export */
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import imgPlaceholder from '../../../src/assets/place-holder-img.png'
import { HeartIcon } from '../../components/Content/components/HeartIcon/HeartIcon'
import './PostDetail.scss'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useMemo } from 'react';
import { PostDesc, PostTitle } from '../../components/PostData/PostData'
import  PostNotFound from '../PostNotFound/PostNotFound'
import DropDownPost from '../../components/Content/components/DropdownPost/DropDownPost';
import { useFavourites, useNavigationPost } from '../../utils/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/slices/auth'
import { deletePost, likePost, savePost, selectPostsData } from '../../store/slices/posts'
import { getBookmarks } from '../../store/reducers/bookmarksReducer';
import { showDeleteConfirm } from '../../utils/modals.utils';

export default () => {
    const isLoggedIn = useSelector(getIsLoggedIn)        // извлекаем состояние авторизации из Redux
    const { isFavourites } = useFavourites()                    // загружаем функционал для избранного
    const params = useParams()
    const [formData, setFormData] = useState({})
    const { postList } = useSelector(selectPostsData)               // извлекае массив из хранилища Redux    
    const post = useMemo(() => postList.find(post => post.id === params.id), [params.id, postList])       // ищим в массиве текущий пост
    const { prevPost, nextPost, prevPostHistory, nextPostHistory, blogHistory } = useNavigationPost(postList, isFavourites)    // загружаем функционал навигации
    const { id, title, description, thumbnail, liked } = post || {}
    const [isEditForm, setIsEditForm] = useState(false)                 // форма редактирования
    const bookmarkList = useSelector(getBookmarks)                        // извлекаем список закладок из Redux
    const bookmark = useMemo(() => bookmarkList.find(bookmark => bookmark.postID === post?.id), [bookmarkList, post?.id])   // есть пост в закладках?
    const dispath = useDispatch()  
    const history = useHistory()

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

    const handleDeletePost = () => {       // удаление поста
        const onOk = async () => {
            await dispath( deletePost(id) )
            blogHistory()
        }
        showDeleteConfirm(onOk)
    }

    const handleEditPost= () => {          // открытие формы редактирования поста
        setIsEditForm(true)
    }
    
    if (!post?.id) return <PostNotFound/>
    // console.log(post);
    
    return (
        <div className="overlay">
        <div className='box'>
            {prevPost && 
                <nav className="box__nav box__nav-prev" onClick={() => prevPostHistory()}>
                    <LeftOutlined className='box-nav__arrow'/>
                </nav>
            }
            <div className="openpost">
                <DropDownPost id={id} bookmark={bookmark} handleEditPost={handleEditPost} handleDeletePost={handleDeletePost}/>
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
                    {!isEditForm &&
                        <nav className="application">
                            <button className="btn--application btn--application-liks" onClick={isLoggedIn ? (e) => handleLikePost(e) : () => history.push('/login')}>
                                <HeartIcon liked={liked} id={id}/>
                                <div className="liks__num" style={liked ? {visibility: "visible"} : {visibility: "hidden"}}>{liked ? "1" : "0"}</div>
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