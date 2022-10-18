/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react"
import "./Content.scss"
import Post from "./Post/Post"
import PostForm from "./PostForm/PostForm"
import { useLoadPosts } from "../../utils/hooks"
import { API } from "../../utils/api"
import OpenPost from "../../pages/OpenPost/OpenPost"
import { useParams } from "react-router-dom"
import { ReactComponent as SearchIcon } from "../../../src/assets/svg/search.svg"
import { iconFilling } from "../../utils/helpers"


export default ({ darkTheme }) => {
  const { blockPosts, updatePosts, isLoading, isFavourites } = useLoadPosts()
  const [isVisibleForm, setIsVisibleForm] = useState(false)
  const [selectPost, setSelectPost] = useState(null)
  const params = useParams()
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  
  // Кнопка лайка
  const likePost = (index) => {
    const updateBlockPosts = [...blockPosts]
    updateBlockPosts[index].liked = !updateBlockPosts[index].liked
    API.updatePostByID(updateBlockPosts[index])
      .then(() => updatePosts())
  }

  // Кнопка удалить пост
  const deletePost = (postID) => {
    const isDelete = window.confirm('Удалить пост?')

    if (isDelete){
      API.deletePost(postID)
        .then(() => updatePosts())
    }
  }

  // Кнопка редактировать пост
  const editPost= (postID) => {
    API.getPost(postID)
      .then((postData) => {
        setSelectPost(postData)
        setIsVisibleForm(true)
      }) 
  }

  if (isLoading) return <h2>Loading... </h2>
  
  return (
      <>
        <div className="content__header">
          <h2 className="title">{isFavourites ? 'Favourites' : 'My blog :)'}</h2>
          <div className="search-wrapper">
            <input className="search-input" type="text" placeholder="поиск"></input>
            <button className="btn--icon" onClick={() => alert('пока что не работает :(')}>
              <SearchIcon className="icon" fill={iconFilling(darkTheme)}/>
            </button>
          </div>
        </div>

        <div className="content__wrapper">
          {
            blockPosts.map((post, index) => {
              return (
                <Post
                  {...post}
                  // title={post.title}
                  // description={post.description}
                  // thumbnail={post.thumbnail}
                  // liked={post.liked}
                  key={post.id}
                  likePost={() => likePost(index)}     // ID !!!
                  deletePost={() => deletePost(post.id)}
                  editPost={() => editPost(post.id)}
                  darkTheme={darkTheme}
                />
              )
            })
          }
        {isLoggedIn && <button className="btn" onClick={() => setIsVisibleForm(true)}>Добавить пост</button>}
        </div>
        
        
        {isVisibleForm && <PostForm
          setIsVisibleForm={setIsVisibleForm}
          selectPost={selectPost}
          setSelectPost={setSelectPost}
          updatePosts={updatePosts}
          darkTheme={darkTheme}
        />}

        {params.id && <OpenPost
          isFavourites={isFavourites}
          updatePosts={updatePosts}
          darkTheme={darkTheme}
        />}
      </>
    )
}