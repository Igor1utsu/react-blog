/* eslint-disable import/no-anonymous-default-export */
import { useLocation } from "react-router-dom"
import "./NoMatch.css"

export default () => {
    const location = useLocation()

    return (
        <h1 className="no-match-title">Страница <span className="no-match-location">{location.pathname}</span> не найдена</h1>
    )
}