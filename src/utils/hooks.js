import { getAuth } from "firebase/auth"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { removeUser, setUser } from "../store/slices/auth"
import { setFavourites, unsetFavourites } from "../store/slices/posts"

export const useLoadAuth = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        getAuth().onAuthStateChanged(user => {
          if (user) {
            dispatch(setUser(user.providerData[0]))     // добавляем данные пользовалеля из Firebase в Redux
          } 
          else { 
            console.log("Выход из системы")
            dispatch(removeUser())
          } 
        })
      },[])
}

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

export const useNavigationPost = (postList, isFavourites ) => {
    const params = useParams()
    const history = useHistory()
    
    const prevPost = useMemo(() => postList[(postList.findIndex(post => post.id === params.id)) - 1], [params.id, postList])    // предыдущий пост в навигации
    const nextPost = useMemo(() => postList[(postList.findIndex(post => post.id === params.id)) + 1], [params.id, postList])    // следующий пост в навигации

    // ссылки prevPost, nexPost, Blog
    const prevPostHistory = useCallback(() => history.push(isFavourites ? `/favourites/${prevPost.id}` : `/blog/${prevPost.id}`), [isFavourites, prevPost])
    const nextPostHistory = useCallback(() => history.push(isFavourites ? `/favourites/${nextPost.id}` : `/blog/${nextPost.id}`), [isFavourites, nextPost])
    const blogHistory = useCallback(() => history.push(isFavourites ? '/favourites' : '/blog'), [isFavourites])
    
    // обработчик событий клавиатуры
    const onKeypress = useCallback((e) => {        
        if(e.key === 'ArrowLeft' && prevPost ){
            prevPostHistory()
        }
        if(e.key === 'ArrowRight' && nextPost){
            nextPostHistory()
        }
    }, [nextPost, nextPostHistory, prevPost, prevPostHistory])

    useEffect(() => {
        document.addEventListener("keydown", onKeypress)                    // добавление обработки события при нажатия клавиш
        return () => document.removeEventListener("keydown", onKeypress)    // удаление прослушивателя событий
    }, [onKeypress])

    return { prevPost, nextPost, prevPostHistory, nextPostHistory, blogHistory }
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

export const useSearch = ( postList ) => {
    const [searchData, setSearchData] = useState('')

    const handleSearch = (e) => {
        setSearchData(e.target.value)   // изменяем данные для поиска
    }
    
    // если есть данные для поиска фильтруем массив на совпадение в title и description
    const searchResult = useMemo(() => 
    searchData ? postList.filter(post => post.title.toUpperCase().includes(searchData.toUpperCase()) || post.description.toUpperCase().includes(searchData.toUpperCase())) : null, [postList, searchData])

    return { handleSearch, searchResult }
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