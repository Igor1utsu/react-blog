import { useSelector } from "react-redux"
import { ReactComponent as HeartLike } from "../../assets/svg/heart-like.svg"
import { ReactComponent as Heart } from "../../assets/svg/heart.svg"
import { selectPostsData } from "../../store/slices/posts"

export const HeartIcon = ({ liked, id }) => {
    const { pendingLike } = useSelector(selectPostsData)

    if (pendingLike === id) return <HeartLike className="icon"/>    // если идет отправка на сервер
    if (liked) return <HeartLike  className="icon icon-liked"/>     // если стоит лайк
    return <Heart className="icon"/>
}