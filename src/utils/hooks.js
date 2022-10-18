import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { API } from "./api"


export const useLoadPosts = () => {
    const [blockPosts, setBlockPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const isFavourites = location.pathname.includes('favourites')

    // Фильтруем избранные посты
    const getFilteredPosts = (postData) => {
        return isFavourites ? postData.filter(p => p.liked) : postData  
    }

    useEffect(() => {
        setIsLoading(true)
        API.loadPosts( )
            .then((postData) =>  {
                const posts = getFilteredPosts(postData)
                setBlockPosts(posts?.length ? posts : [])
                setIsLoading(false)
            })
    }, [isFavourites])

    const updatePosts = () => {
        API.loadPosts()
            .then((postsData) => {
                console.log('updatePosts...')
                const posts = getFilteredPosts(postsData)
                setBlockPosts(posts?.length ? posts : [])})
    }

    return { blockPosts, updatePosts, isLoading, isFavourites }
}

