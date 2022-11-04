/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from "react"
import "./Content.scss"
import Post from "./Post/Post"
import PostForm from "./PostForm/PostForm"
import { useFavourites, useSearch } from "../../utils/hooks"
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
  const { handleSearch, searchResult } = useSearch( postList )   // функционал для поиска
  const params = useParams()
  const isLoggedIn = useSelector(selectIsLoggedin)    // извлекаем состояние авторизации из Redux
  const dispath = useDispatch()

  useEffect(() => {
    dispath(loadPosts())      // загружаем посты
  }, [])

  if (isLoading) return <h2 className="content__message">Loading... </h2>
  if (error) return <h2 className="content__message">Error</h2>
  
  return (
      <>
        <div className="content__header">
          <h2 className="title">{isFavourites ? 'Favourites' : 'My blog :)'}</h2>
          <div className="search">
            <SearchIcon className="search__icon"/>
            <input className="search__input" type="text" placeholder="поиск" onChange={handleSearch}></input>
          </div>
        </div>

        <div className="content__wrapper">
          {
            (postList.length === 0) && <h4 className="content__message">Постов нет</h4>
          }
          {
            searchResult && <h4 className="content__message">Найдено: {searchResult.length}</h4>
          }
          {
            !searchResult && postList.map((post, index) => {
              return (
                <Post
                  post={post}
                  key={post.id}
                  setSelectPost={setSelectPost}
                  setIsVisibleForm={setIsVisibleForm}
                />
              )
            })
          }
          {
            searchResult && searchResult.map((post, index) => {
              return (
                <Post
                  post={post}
                  key={post.id}
                  setSelectPost={setSelectPost}
                  setIsVisibleForm={setIsVisibleForm}
                />
              )
            })
          }
        {isLoggedIn && !isFavourites && !searchResult && <button className="btn" onClick={() => setIsVisibleForm(true)}>Добавить пост</button>}      {/* если авторизованны и не в избранном: показываем кнопку */}
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