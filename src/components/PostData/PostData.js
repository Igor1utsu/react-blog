import { useEffect, useState } from "react"
import "./PostData.css"

export const PostTitle = ({ title, isEditForm, onValuesChange }) => {
    const [titleInput, setTitleInput] = useState(title)     // загружаем данные из PostDetail

    useEffect(() => {
        onValuesChange({title: titleInput})    // передаем дынные из импута в PostDetail
    }, [titleInput])
    
    const handleChangeTitle = (event) => {
        setTitleInput(event.target.value)
    }

    return isEditForm ? 
        <input 
            className="post-title post-input"
            type="text" 
            value={titleInput} 
            onChange={handleChangeTitle} 
            required>
        </input> : 
        <h3 className="openpost__title">{title}</h3>
}

export const PostDesc = ({ description, isEditForm, onValuesChange }) => {
    const [descInput, setDescInput] = useState(description)     // загружаем данные из PostDetail

    useEffect(() => {
        onValuesChange({description: descInput})    // передаем дынные из импута в PostDetail
    }, [descInput])
    
    const handleChangeDesc = (event) => {
        setDescInput(event.target.value)
    }

    return isEditForm ? 
        <textarea 
            className="post-description post-input"
            type="textarea" 
            value={descInput} 
            onChange={handleChangeDesc}
            rows={2}
            required>
        </textarea> : 
        <div className="openpost__description">{description}</div>
}