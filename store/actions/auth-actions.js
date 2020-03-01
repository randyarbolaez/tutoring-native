import { AsyncStorage } from "react-native";

import ENV from "../../env";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

export const verify = (username, password, isSignUp) => {
  return async dispatch => {
    const response = await fetch(
      `${ENV.apiUrl}${isSignUp ? "signup" : "authenticate"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    if (!response.ok) {
      console.log("SOMETHING WENT WRONG AUTHENTICATION", response);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.user._id,
        resData.token,
        parseInt(resData.user.created_at) * 100000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.user.created_at) * 100000
    );
    saveDataToStorage(resData.token, resData.user._id, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
