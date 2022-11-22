import { BOOKMARKS_URL, POSTS_URL } from "../data/data"


export const API = {
    loadPosts: ( isFavourites ) => { 
        return new Promise (function(resolve, reject) {
            fetch(POSTS_URL)
                .then(response => {
                    if (response.ok) {              // ести статус OK: возвращаем данные
                        return response.json()
                            .then(data => {
                                resolve( isFavourites ? data.filter(p => p.liked) : data )      // фильтруем избранные посты и возвращаем массив
                            }) 
                    } else { reject( Error ) }      // или возвращаем ошибку
                })  
        })

    },

    createPost: (newPost) => {
        return fetch(POSTS_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPost)
        })
    },

    updatePostByID: (editablePost) => {
        return fetch(POSTS_URL + editablePost.id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editablePost)
          })
    },

    deletePost: (postID) => {
        return fetch(POSTS_URL + postID, {method: 'DELETE'})
    },

    getPost: (postID) => new Promise ((resolve, reject) => {
        return fetch(POSTS_URL + postID)
            .then(response => response.json())
            .then(data => resolve(data))
    }),

    loadBookmarks: async () => {
        const response  = await fetch(BOOKMARKS_URL)
        return response.json()
    },

    addBookmark: async (id) => {
        const response = await fetch(BOOKMARKS_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({postID: id})
        })
        return response.json()
    },

    deleteBookmark: async (id) => {
        const response = await fetch(BOOKMARKS_URL + id, {
            method: 'DELETE',
        })
        return response.json()
    }
}