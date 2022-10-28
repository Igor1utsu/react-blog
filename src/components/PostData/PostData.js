import { useEffect, useState } from "react"
import "./PostData.css"

export const PostTitle = ({ title, isEdit, onValuesChange }) => {
    const [titleInput, setTitleInput] = useState(title)     // загружаем данные из OpenPost

    useEffect(() => {
        onValuesChange({title: titleInput})    // передаем дынные из импута в OpenPost
    }, [titleInput])
    
    const handleChangeTitle = (event) => {
        setTitleInput(event.target.value)
    }

    return isEdit ? 
        <input 
            className="post-title post-input"
            type="text" 
            value={titleInput} 
            onChange={handleChangeTitle} 
            required>
        </input> : 
        <h3 className="openpost__title">{title}</h3>
}

export const PostDesc = ({ description, isEdit, onValuesChange }) => {
    const [descInput, setDescInput] = useState(description)     // загружаем данные из OpenPost

    useEffect(() => {
        onValuesChange({description: descInput})    // передаем дынные из импута в OpenPost
    }, [descInput])
    
    const handleChangeDesc = (event) => {
        setDescInput(event.target.value)
    }

    return isEdit ? 
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