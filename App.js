import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import NavigationContainer from "./navigation/NavigationContainer";
import authReducer from "./store/reducers/auth-reducer";
import postsReducer from "./store/reducers/post-reducer";
import bookmarkReducer from "./store/reducers/bookmark-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postsReducer,
  bookmark: bookmarkReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;

// <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
