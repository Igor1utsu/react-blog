import { useEffect, useState } from "react"
import "./PostData.css"

export const PostTitle = ({ title, isEdit, onValuesChange }) => {
    const [titleInput, setTitleInput] = useState(title)

    useEffect(() => {
        setTitleInput(title)
    }, [title])
    
    const handleChangeTitle = (event) => {
        setTitleInput(event.target.value)
        onValuesChange({title: titleInput})
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
    const [descInput, setDescInput] = useState(description)

    useEffect(() => {
        setDescInput(description)
    }, [description])
    
    const handleChangeDesc = (event) => {
        setDescInput(event.target.value)
        onValuesChange({description: descInput})
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