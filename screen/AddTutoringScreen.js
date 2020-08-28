import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as postActions from "../store/actions/post-actions";

const AddTutoringScreen = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
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
        onChangeText={(value) => setTitle(value.trim())}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        multiline={true}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        blurOnSubmit={true}
        maxLength="125"
        required
        onChangeText={(value) => setDescription(value.trim())}
      />
      <Button
        title="Add"
        disabled={title.length < 3 || description.length < 15}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleInput: {
    color: "#696969",
    paddingHorizontal: 2,
    paddingVertical: 5,
    textAlign: "center",
    height: 50,
    width: "80%",
    fontSize: 20,
    marginTop: 10,

    borderBottomColor: "#FFD6C0",
    borderColor: "#DB7093",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: "500%",
  },
  descriptionInput: {
    color: "#696969",
    paddingHorizontal: 2,
    paddingVertical: 5,
    textAlign: "center",
    height: "40%",
    width: "80%",
    fontSize: 20,

    borderTopColor: "#FFD6C0",
    borderColor: "#DB7093",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: "500%",
  },
});

export default AddTutoringScreen;
