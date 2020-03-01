import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as postActions from "../store/actions/post-actions";

const AddTutoringScreen = props => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const loadPosts = useCallback(async () => {
    try {
      await dispatch(postActions.fetchPosts());
    } catch (err) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  const addPostHandler = async () => {
    let action = postActions.createPost(title, description, token);
    if (title.length < 3 || description.length < 15) {
      setError(true);
    }
    try {
      await dispatch(action);
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        maxLength="20"
        required
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        multiline={true}
        numberOfLines={4}
        maxLength="125"
        required
        onChangeText={value => setDescription(value)}
      />
      <Button
        title="Create"
        onPress={() => {
          props.navigation.goBack();
          addPostHandler();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#F7F0FF",
    marginTop: 10,
    height: 50,
    width: "80%",
    fontSize: 20
  },
  descriptionInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#F7F0FF",
    marginTop: 10,
    width: "80%",
    fontSize: 23,
    height: "40%"
  }
});

AddTutoringScreen.navigationOptions = navData => {
  return {
    header: null
  };
};

export default AddTutoringScreen;
