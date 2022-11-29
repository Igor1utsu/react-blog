/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react"
import "./PostForm.scss"
import { ReactComponent as CloseIcon } from "../../../../assets/svg/close-button.svg"
import { useDispatch } from "react-redux"
import { addPost, savePost } from "../../../../store/slices/posts"


export default ({ setIsVisibleForm, selectPost, setSelectPost }) => {
  const [titleInput, setTitleInput] = useState(selectPost ? selectPost.title : '')          // если спустили пост: показываем его данные в импутах
  const [descInput, setDescInput] = useState(selectPost ? selectPost.description : '')
  const [imgSrcInput, setImgSrcInput] = useState(selectPost ? selectPost.thumbnail : '')
  const dispatch = useDispatch()


  const handleChangeTitle = (event) => {
    setTitleInput(event.target.value)
  }
  const handleChangeDesc = (event) => {
    setDescInput(event.target.value)
  }
  const handleChangeImgSrc = (event) => {
    setImgSrcInput(event.target.value)
  }

  // функция создания нового поста
  const createPost = (event) => {
    event.preventDefault()

    const newPost = {
      title: titleInput,
      description: descInput,
      thumbnail: imgSrcInput,
      liked: false
    }

    dispatch( addPost(newPost) )
    setIsVisibleForm(false)
  }

  // функция изменения поста
  const editPost = (event) => {
    event.preventDefault()

    const dataPost = {
        ...selectPost,
      title: titleInput,
      description: descInput,
      thumbnail: imgSrcInput
    }

    dispatch( savePost(dataPost) )
    setIsVisibleForm(false)
}

  // Закрыть форму
  const closeForm = (event) => {
    event.preventDefault()
    setIsVisibleForm(false)
    setSelectPost(null)
  }

  // Форма: Радактировать / Создать
  const formInfo = {
    title: selectPost ? 'Редактирование записи' : 'Добавление записи',
    textBtn: selectPost ? 'Сохранить' : 'Создать',
    btnClick: selectPost ? editPost : createPost
  }

  return (
    <div 
      className="overlay" 
      onClick={closeForm} 
    >
      <form className="form" onSubmit={formInfo.btnClick} onClick={(event) => event.stopPropagation()}>
        <div className="post-form-header">
          <h2 className="post-form-title">{formInfo.title}</h2>
          <button className="btn--icon" onClick={closeForm}>
            <CloseIcon className="icon"/>
          </button>
        </div>
        <input
          className="input"
          value={titleInput}
          onChange={handleChangeTitle}
          placeholder="Заголовок"
          type="text"
          required
        ></input>
        <textarea
          className="textarea"
          value={descInput}
          onChange={handleChangeDesc}
          placeholder="Описание"
          type="text"
          rows="6"
          required
        ></textarea>
        <input
          className="input"
          value={imgSrcInput}
          onChange={handleChangeImgSrc}
          placeholder="Адрес картинки"
          type="text"
          ></input>
        <button className="btn" type="submit">{formInfo.textBtn}</button>
      </form>
    </div>
  )
}


