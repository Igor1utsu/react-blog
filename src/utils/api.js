import { POSTS_URL } from "../data/data"


export const API = {
    loadPosts: ( ) => { 
        return new Promise (function(resolve, reject) {
            fetch(POSTS_URL)
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                })
                .catch(er => reject( console.error(er) ))      
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
    })
}