/* eslint-disable default-case */
const LOAD_BOOKMARKS = "LOAD_BOOKMARK"
const ADD_BOOKMARK = "ADD_BOOKMARK"
const DELETE_BOOKMARK = "DELETE_BOOKMARK"

const initialState = {
    bookmarkList: []
}

export const bookmarksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKMARKS: 
            return {...state, bookmarkList: action.payload}
        case ADD_BOOKMARK: 
            return {...state, bookmarkList: [...state.bookmarkList, action.payload]}
        case DELETE_BOOKMARK: 
            return {...state, bookmarkList: state.bookmarkList.filter(bookmark => bookmark.id !== action.payload.id)}
        default:
            return state
    }
}

export const loadBookmarksAction = (payload) => ({type: LOAD_BOOKMARKS, payload})
export const addBookmarkAction = (payload) => ({type: ADD_BOOKMARK, payload})
export const deleteBookmarkAction = (payload) => ({type: DELETE_BOOKMARK, payload})
export const getBookmarks = (state => state.bookmarks.bookmarkList)