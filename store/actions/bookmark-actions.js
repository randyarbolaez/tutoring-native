import AsyncStorage from "@react-native-async-storage/async-storage";

import ENV from "../../env";
export const READ_BOOKMARK = "READ_BOOKMARK";
export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

export const fetchBookmarks = () => {
  let { token, userId } = JSON.parse(localStorage.getItem("userData"));

  return async (dispatch) => {
    try {
      const res = await fetch(`${ENV.apiUrl}bookmark/bookmarks/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.log(res);
        throw new Error("Something went wrong!");
      }

      const resData = await res.json();
      let { bookmarks } = resData.bookmarks;

      let loadedBookmarks = [...bookmarks];

      dispatch({
        type: READ_BOOKMARK,
        bookmarks: loadedBookmarks,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addBookmark = (post) => {
  let { token, userId } = post.currentUser;

  return async (dispatch) => {
    const res = await fetch(`${ENV.apiUrl}bookmark/add/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("Something went wrong");
    }
    const resData = await res.json();
    console.log(resData);
    dispatch({
      type: ADD_BOOKMARK,
      bookmark: {
        post,
      },
    });
  };
};

export const removeBookmark = (post) => {
  let { token, userId } = JSON.parse(localStorage.getItem("userData"));
  return async (dispatch) => {
    const res = await fetch(`${ENV.apiUrl}bookmark/remove/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("Something went wrong");
    }
    const resData = await res.json();

    dispatch({
      type: REMOVE_BOOKMARK,
      bookmark: {
        newBookmark: resData.user.bookmarks,
      },
    });
  };
};
