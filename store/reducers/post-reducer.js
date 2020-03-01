import {
  CREATE_POST,
  READ_POST,
  DELETE_POST,
  SEARCH_POSTS
} from "../actions/post-actions";

const initialState = {
  allPosts: [],
  searchPosts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      const newPost = {
        _id: action.postData._id,
        title: action.postData.title,
        description: action.postData.description,
        user: action.postData.user
      };
      return { ...state, searchPosts: state.searchPosts.concat(newPost) };
    case READ_POST:
      return {
        allPosts: action.posts,
        searchPosts: action.posts
      };
    case DELETE_POST:
      return {
        ...state,
        searchPosts: state.searchPosts.filter(post => post.id !== action.postId)
      };
    case SEARCH_POSTS:
      return {
        ...state,
        searchPosts: action.posts
      };
    default:
      return state;
  }
};
