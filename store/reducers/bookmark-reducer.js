import {
  READ_BOOKMARK,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from "../actions/bookmark-actions";

const initialState = {
  allBookmarks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case READ_BOOKMARK:
      return {
        allBookmarks: action.bookmarks,
      };
    case ADD_BOOKMARK:
      return {
        ...state,
        allBookmarks: state.allBookmarks.concat(action.bookmark.post),
      };
    case REMOVE_BOOKMARK:
      console.log(action.bookmark.newBookmark);
      return {
        ...state,
        allBookmarks: action.bookmark.newBookmark,
      };
    default:
      return state;
  }
};
