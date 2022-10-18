import { useLocation } from "react-router-dom"
import "./Notifications.css"

export const Notifications = ({ body}) => {
    const location = useLocation()

    return (
        <div className="overlay">
            <div className="notifications">{body}{location.pathname}</div>
        </div>
    )
}