import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import Post from "../components/Post";

import * as authActions from "../store/actions/auth-actions";
import * as postActions from "../store/actions/post-actions";
import Colors from "../constants/Colors";

const TutoringScreen = (props) => {
  const [search, setSearch] = useState();
  let posts = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const loadPosts = useCallback(async () => {
    try {
      await dispatch(postActions.searchPosts());
    } catch (err) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  const onInputChangeHandler = async (value) => {
    setSearch(value);
    let action = postActions.searchPosts(value, posts);
    try {
      await dispatch(action);
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    props.navigation.setParams({
      logout: () => {
        dispatch(authActions.logout());
      },
    });
  }, [dispatch]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        type="text"
        value={search}
        onChangeText={(value) => {
          onInputChangeHandler(value);
        }}
        placeholder="Search"
      />
      <View style={styles.container}>
        <Post />
      </View>
    </View>
  );
};

TutoringScreen.navigationOptions = (navData) => {
  const logout = navData.navigation.getParam("logout");
  return {
    title: "Tutoring Board",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Post"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("AddTutoring");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Logout"
          iconName={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
          onPress={() => {
            logout();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: "7%",
  },
  container: {
    height: "97%",
  },
  input: {
    marginTop: 25,
    fontSize: 20,
    textAlign: "center",
    height: 50,
    color: "#DC143C",
  },
});

export default TutoringScreen;
