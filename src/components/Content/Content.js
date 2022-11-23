/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from "react"
import "./Content.scss"
import Post from "./Post/Post"
import PostForm from "./PostForm/PostForm"
import { useFavourites, useSearch } from "../../utils/hooks"
import OpenPost from "../../pages/OpenPost/OpenPost"
import NoBookmark from "./NoBookmark/NoBookmark"
import Search from "antd/lib/input/Search"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getIsLoggedIn } from "../../store/slices/auth"
import { loadPosts, selectPostsData } from "../../store/slices/posts"
import { loadBookmarks } from "../../store/actions/bookmarks"
import { getBookmarks } from "../../store/reducers/bookmarksReducer"


export default () => {
  const { postList, isLoading, error } = useSelector(selectPostsData)      // извлекаем информацию о постах из Redux 
  const bookmarkList = useSelector(getBookmarks)                        // извлекаем список закладок из Redux
  const { isFavourites, isBookmarks } = useFavourites()                            // загружаем функционал для избранного
  const [isVisibleForm, setIsVisibleForm] = useState(false)       // форма создания / редактрования поста
  const [selectPost, setSelectPost] = useState(null)
  const { handleSearch, searchResult } = useSearch( postList )   // функционал для поиска
  const params = useParams()
  const isLoggedIn = useSelector(getIsLoggedIn)    // извлекаем состояние авторизации из Redux
  const dispath = useDispatch()

  useEffect(() => {
    dispath(loadPosts())      // загружаем посты
    dispath(loadBookmarks())    // загружаем список закладок
  }, [])

  if (isLoading) return <h3 className="content__message">Loading... </h3>
  if (error) return <h3 className="content__message">Error</h3>
  
  return (
      <>
        <div className="content__header">
          {isFavourites && <h2 className="title">Избранное</h2>}
          {isBookmarks && <h2 className="title">Закладки</h2>}
          {isLoggedIn && !isFavourites && !isBookmarks && !searchResult && 
            <button className="btn" onClick={() => setIsVisibleForm(true)}>Добавить запись</button>
          }
          {!isBookmarks && 
            <div id="search">
              <Search placeholder="поиск" onChange={handleSearch}/>
            </div>
          }
        </div>

        <div className="content__wrapper">
          {
            !isBookmarks && (postList.length === 0) && <h4 className="content__message">Постов нет</h4>
          }
          {
            isBookmarks && (bookmarkList.length === 0) && <h4 className="content__message">Нет закладок</h4>
          }
          {
            searchResult && <h4 className="content__message content__message-search">Найдено: {searchResult.length}</h4>
          }
          {
            !searchResult && !isBookmarks && postList.map((post, index) => {
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
            isBookmarks && bookmarkList.map((record, index) => {
              const bookmark = postList.find(post => post.id === bookmarkList[index].postID)

              if (bookmark) {
                return (
                  <Post
                    post={bookmark}
                    key={index}
                  />
                )
              } else {
                return (
                <NoBookmark
                  record={record}
                  key={index}
                />)
              }
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