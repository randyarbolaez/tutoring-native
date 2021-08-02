import AsyncStorage from "@react-native-async-storage/async-storage";
import ENV from "../../env";

export const CREATE_POST = "CREATE_POST";
export const READ_POST = "READ_POST";
export const DELETE_POST = "DELETE_POST";
export const SEARCH_POSTS = "SEARCH_POSTS";

export const createPost = (title, description, token) => {
  return async (dispatch) => {
    const res = await fetch(`${ENV.apiUrl}post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const resData = await res.json();
    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: CREATE_POST,
      postData: {
        _id: resData._id,
        title: title,
        description: description,
        user: resData.user,
      },
    });
  };
};

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${ENV.apiUrl}post/posts`);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await res.json();
      let loadedPosts = [...resData.allPosts];

      dispatch({
        type: READ_POST,
        posts: loadedPosts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const searchPosts = (search, posts) => {
  return async (dispatch) => {
    let postsThatWereSearchedFor = posts.allPosts.filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });

    dispatch({
      type: SEARCH_POSTS,
      posts: postsThatWereSearchedFor,
    });
  };
};

export const deletePost = (post) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    let userDataParsed = JSON.parse(userData);
    const res = await fetch(`${ENV.apiUrl}post/delete/${post}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userDataParsed.token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({ type: DELETE_POST, postId: post });
  };
};
