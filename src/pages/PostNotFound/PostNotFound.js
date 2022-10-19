/* eslint-disable import/no-anonymous-default-export */
import { useHistory } from 'react-router-dom'
import './Post-not-found.scss'

export default () => {
    const history = useHistory()
    setTimeout(() => {history.push('/blog')}, 3000)

    return (
        <div className="overlay">
            <div className="post-not-found">
                <h3 className="post-not-found__title">Пост не найден</h3>
            </div>
        </div>
    )
}