/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState, useMemo } from "react"
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
  const [searchData, setSearchData] = useState('')
  // если есть данные для поиска фильтруем массив на совпадение в title и description
  const searchResult = useMemo(() => 
    searchData ? postList.filter(post => post.title.toUpperCase().includes(searchData.toUpperCase()) || post.description.toUpperCase().includes(searchData.toUpperCase())) : null, [postList, searchData])

  const handleSearch = (e) => {
    setSearchData(e.target.value)   // изменяем данные для поиска
  }
  
  console.log(['find:', searchData, 'result:', searchData])

  useEffect(() => {
    dispath(loadPosts())      // загружаем посты
  }, [])

  if (isLoading) return <h2 className="content__message">Loading... </h2>
  if (error) return <h2 className="content__message">Error</h2>
  
  return (
      <>
        <div className="content__header">
          <h2 className="title">{isFavourites ? 'Favourites' : 'My blog :)'}</h2>
          <div className="search-wrapper">
            <input className="search-input" type="text" placeholder="поиск" value={searchData} onChange={handleSearch}></input>
            <SearchIcon className="icon"/>
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