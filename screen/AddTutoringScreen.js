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
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
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
    // setIsRefreshing(false);
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
      
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          maxLength={20}
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
          maxLength={125}
          required
          onChangeText={(value) => setDescription(value.trim())}
        />
        <Button
          title="Add"
          color={"#F7934C"}
          disabled={title.length < 3 || description.length < 15}
          onPress={() => {
            props.navigation.goBack();
            addPostHandler();
          }}
        />
      </KeyboardAvoidingView>
      
    </View>
  );
};

AddTutoringScreen.navigationOptions = (navData) => {
  return {
    headerStyle:{
      borderBottomWidth:0,
      backgroundColor:"#F7934C",
    },
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Logout"
          iconName={Platform.OS === "android" ? "md-log-out" : "md-arrow-round-back"}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#F7934C',
  },
  container:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#F8F7FF',
    width:"90%",
    height:"60%",
    borderRadius:25,
  },
  titleInput: {
    color: "#696969",
    paddingHorizontal: 2,
    paddingVertical: 5,
    textAlign: "center",
    height: 50,
    width: "80%",
    fontSize: 20,
    marginBottom:5,
    
    borderWidth:2,
    borderColor:"transparent",
    borderBottomColor: "#F7934C",
    borderBottomColor: "#FFD5C2",
  },
  descriptionInput: {
    color: "#696969",
    paddingHorizontal: 2,
    paddingVertical: 5,
    textAlign: "center",
    width: "80%",
    fontSize: 20,
    marginTop:25,
    marginBottom:15,

    borderWidth:2,
    borderColor:"transparent",
    borderBottomColor: "#FFD5C2", 
  },
});

export default AddTutoringScreen;
