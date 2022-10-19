/* eslint-disable import/no-anonymous-default-export */
import { useLocation } from "react-router-dom"
import "./NoMatch.scss"

export default () => {
    const location = useLocation()

    return (
        <h1 className="no-match__title">Страница <span className="no-match__location">{location.pathname}</span> не найдена</h1>
    )
}