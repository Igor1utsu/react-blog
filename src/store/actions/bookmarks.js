import { API } from "../../utils/api"
import { addBookmarkAction, deleteBookmarkAction, loadBookmarksAction } from "../reducers/bookmarksReducer"

export const loadBookmarks = () => {
    return (dispatch, getState) => {
        API.loadBookmarks()
            .then((bookmarks) => dispatch( loadBookmarksAction(bookmarks) ))
    }
}

export const addBookmark = (postID) => {
    return (dispatch, getState) => {
        API.addBookmark(postID)
            .then((response) => dispatch( addBookmarkAction(response) ))
    }
}

export const deleteBookmark = (postID) => {
    return (dispatch, getState) => {
        API.deleteBookmark(postID)
            .then((response) => dispatch( deleteBookmarkAction(response) ))
    }
}