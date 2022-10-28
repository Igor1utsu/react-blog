/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from "react"
import "./Content.scss"
import Post from "./Post/Post"
import PostForm from "./PostForm/PostForm"
import { useFavourites } from "../../utils/hooks"
import OpenPost from "../../pages/OpenPost/OpenPost"
import { useParams } from "react-router-dom"
import { ReactComponent as SearchIcon } from "../../../src/assets/svg/search.svg"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedin } from "../../store/slices/auth"
import { loadPosts, selectPostsData } from "../../store/slices/posts"


export default () => {
  const { postList, isLoading, error } = useSelector(selectPostsData)      // извлекаем информацию о постах из Redux 
  const isFavourites = useFavourites()                            // загружаем функционал для избранного
  const [isVisibleForm, setIsVisibleForm] = useState(false)       // форма создания / редактрования поста
  const [selectPost, setSelectPost] = useState(null)
  const params = useParams()
  const isLoggedIn = useSelector(selectIsLoggedin)    // извлекаем состояние авторизации из Redux
  const dispath = useDispatch()


  useEffect(() => {
    dispath(loadPosts())      // загружаем посты
  }, [])

  // открытие формы редактирование поста
  const handleEditPost= (post) => {
    setSelectPost(post)       // заносим текущий пост в стейт
    setIsVisibleForm(true)      // открываем форму
  }

  if (isLoading) return <h2>Loading... </h2>
  if (error) return <h2>Error</h2>
  
  return (
      <>
        <div className="content__header">
          <h2 className="title">{isFavourites ? 'Favourites' : 'My blog :)'}</h2>
          <div className="search-wrapper">
            <input className="search-input" type="text" placeholder="поиск"></input>
            <button className="btn--icon" onClick={() => alert('пока что не работает :(')}>
              <SearchIcon className="icon"/>
            </button>
          </div>
        </div>

        <div className="content__wrapper">
          {
            postList.map((post, index) => {
              return (
                <Post
                  post={post}
                  key={post.id}
                  handleEditPost={() => handleEditPost(post)}
                />
              )
            })
          }
        {isLoggedIn && !isFavourites && <button className="btn" onClick={() => setIsVisibleForm(true)}>Добавить пост</button>}      {/* если авторизованны и не в избранном: показываем кнопку */}
        </div>
        
        
        {isVisibleForm && <PostForm
          setIsVisibleForm={setIsVisibleForm}
          selectPost={selectPost}
          setSelectPost={setSelectPost}
        />}

        {params.id && !isLoading && <OpenPost/>}
      </>
    )
}