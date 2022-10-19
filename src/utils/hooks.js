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

export const useThemeStyle = () => {
    const [darkTheme, setDarkTheme] = useState(localStorage.getItem('darkTheme') || false)      // считываем статус в localStorege или устанавливаем значение в false

    useEffect(() => {
        const colorRed = "#ff0000"
        const colorBlue = "#1E90FF"
        const colorLight = "#f0f0f0"
        const colorLightGray = "#e6e6e6"
        const colorLightGray2 = "#b0b0b0"
        const colorGray = "#636363"
        const colorGray2 = "#262626"
        const colorDarkGray = "#141414"
        const colorDark = "#0a0a0a"
        
        const root = document.documentElement
        root?.style.setProperty( "--color1", darkTheme ? colorDarkGray : colorLightGray )      // Background
        root?.style.setProperty( "--color2", darkTheme ? colorGray2 : colorLight )      // Window
        root?.style.setProperty( "--color3", darkTheme ? colorDark : colorBlue )      // Header)
        root?.style.setProperty( "--text-color1", darkTheme ? colorLight : colorDark )
        root?.style.setProperty( "--text-color2", darkTheme ? colorLightGray2 : colorGray )
        root?.style.setProperty( "--btn-color", darkTheme ? colorGray : colorDark )      // Button)
        root?.style.setProperty( "--border-color", darkTheme ? colorGray : colorLightGray2 )    // border

        root?.style.setProperty( "--color-light", colorLight )
        root?.style.setProperty( "--color-blue", colorBlue )
        root?.style.setProperty( "--color-heard", colorRed )
    
        if (darkTheme) {
          !localStorage.getItem('darkTheme') && localStorage.setItem('darkTheme', JSON.stringify(darkTheme))
        } else {
          localStorage.removeItem('darkTheme')
        }   // записываем или удаляем темы в локальном хранилище
    }, [darkTheme])
    return { darkTheme, setDarkTheme }
}
