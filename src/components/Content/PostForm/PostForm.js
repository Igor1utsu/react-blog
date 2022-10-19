/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react"
import "./PostForm.scss"
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-button.svg"
import { API } from "../../../utils/api"


export default ({
  setIsVisibleForm, 
  selectPost,
  setSelectPost,
  updatePosts,
}) => {
  const [titleInput, setTitleInput] = useState(selectPost ? selectPost.title : '')
  const [descInput, setDescInput] = useState(selectPost ? selectPost.description : '')
  const [imgSrcInput, setImgSrcInput] = useState(selectPost ? selectPost.thumbnail : '')
  const textBtnCondition = selectPost ? 'Сохранить' : 'Создать'
  const [textBtn, setTextBtn] = useState(textBtnCondition)
  const [colorBtnText, setColorBtnText] = useState('#FFF')

  const handleChangeTitle = (event) => {
    setTitleInput(event.target.value)
  }
  const handleChangeDesc = (event) => {
    setDescInput(event.target.value)
  }
  const handleChangeImgSrc = (event) => {
    setImgSrcInput(event.target.value)
  }

  // Создать новый пост
  const createPost = (event) => {
    event.preventDefault()

    const newPost = {
      title: titleInput,
      description: descInput,
      thumbnail: imgSrcInput,
      liked: false
    }

    setIsVisibleForm(false)
    API.createPost(newPost)
      .catch((er) => errorSendForm(er))
      .then(() => updatePosts())
  }

  // Сохранить редактируемый пост
  const editPost = (event) => {
    event.preventDefault()

    const editablePost = {
      ...selectPost,
      title: titleInput,
      description: descInput,
      thumbnail: imgSrcInput
    }

    setIsVisibleForm(false)
    API.updatePostByID(editablePost)
      .catch((er) => errorSendForm(er))
      .then(() => updatePosts())
      .then(() => setSelectPost(null))
  }

  // Закрыть форму
  const closeForm = (event) => {
    event.preventDefault()
    setIsVisibleForm(false)
    setSelectPost(null)
  }

  // Ошибка при отправки формы
  const errorSendForm = (er) => {
    setColorBtnText('#F00')
    setTextBtn('Ошибка')
    console.error('ERROR !!!', er)
    setTimeout(() => {
      setColorBtnText('#FFF')
      setTextBtn(textBtnCondition)
    }, 3000)
  }

  // Форма: Радактировать / Создать
  const formInfo = {
    title: selectPost ? 'Редактировать пост' : 'Создать пост',
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
        <button className="btn" type="submit" style={{color: colorBtnText}}>{textBtn}</button>
      </form>
    </div>
  )
}


