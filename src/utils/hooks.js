import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { setFavourites, unsetFavourites } from "../store/slices/posts"


export const useFavourites = () => {
    const { pathname } = useLocation()
    const isFavourites = pathname.includes('favourites')        // проверям наличие favourites в адресной строке
    const dispath = useDispatch()

    useEffect(() => {
        isFavourites ? dispath( setFavourites() ) : dispath( unsetFavourites() )    // изменяем isFavourites в глобальном хранилище
    }, [isFavourites])

    return isFavourites
}

export const useThemeStyle = () => {
    const [darkTheme, setDarkTheme] = useState(localStorage.getItem('darkTheme') === 'true' || false)      // считываем статус в localStorege или устанавливаем значение в false

    const colorRed = "#ff0000"
    const colorBlue = "#1E90FF"
    const colorLight = "#f0f0f0"
    const colorLightGray = "#e6e6e6"
    const colorLightGray2 = "#b0b0b0"
    const colorGray = "#636363"
    const colorGray2 = "#262626"
    const colorDarkGray = "#141414"
    const colorDark = "#0a0a0a"

    useEffect(() => {
        if (darkTheme) { localStorage.setItem('darkTheme', true) } else { localStorage.setItem('darkTheme', false) }
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
    }, [darkTheme])
    return { darkTheme, setDarkTheme }
}

// скрываем / показываем боковую панель
export const useIsHiddeSideBar = () => {
    const [isSidebar, setSidebar] = useState(localStorage.getItem('isHiddenSideBar') === 'false')      // Sidebar-menu on / off

    const handleToggleSideBar = (e) => {
        e.preventDefault()
        setSidebar(!isSidebar)      // меняем стейт
        if (isSidebar) { localStorage.setItem('isHiddenSideBar', true) } else { localStorage.setItem('isHiddenSideBar', false) }
    }

    document.documentElement?.style.setProperty( "--display-sidebar", isSidebar ? 'flex' : 'none' )    // меняем CSS свойство
    document.documentElement?.style.setProperty( "--display-content", isSidebar ? 'none' : 'block' )    // оптимизация для мобильных устройств

    return { isSidebar, handleToggleSideBar }
}

export const useOutsideAlerter = (ref, action) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                action()    // действие при click outside
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])
}

// старый функционал получения постов
//
// export const useLoadPosts = () => {
//     const [blockPosts, setBlockPosts] = useState([])
//     const [isLoading, setIsLoading] = useState(false)
//     const location = useLocation()
//     const isFavourites = location.pathname.includes('favourites')

//     // Фильтруем избранные посты
//     const getFilteredPosts = (postData) => {
//         return isFavourites ? postData.filter(p => p.liked) : postData  
//     }

//     useEffect(() => {
//         setIsLoading(true)
//         API.loadPosts( )
//             .then((postData) =>  {
//                 const posts = getFilteredPosts(postData)
//                 setBlockPosts(posts?.length ? posts : [])
//                 setIsLoading(false)
//             })
//     }, [isFavourites])

//     const updatePosts = () => {
//         API.loadPosts()
//             .then((postsData) => {
//                 console.log('updatePosts...')
//                 const posts = getFilteredPosts(postsData)
//                 setBlockPosts(posts?.length ? posts : [])})
//     }

//     return { blockPosts, updatePosts, isLoading, isFavourites }
// }