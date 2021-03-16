import React, { useState, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";

import * as authActions from "../store/actions/auth-actions";

import Colors from "../constants/Colors";

const AuthScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(true);

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action = authActions.verify(username, password, isSignup);
    if (username.length < 3 || password.length < 3) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
    if (username == undefined || password == undefined) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
    try {
      await dispatch(action);
      props.navigation.navigate("TutoringBlah");
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <Text style={styles.title}>
          {isSignup ? "Hello, Sign up!" : "Welcome back!"}
        </Text>
        <View style={styles.container}>
          <View style={styles.buttonWrapper}>
            <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                  setIsSignup(true);
                }}>
              <Text style={{...styles.buttonText,color:`${isSignup ? '#1F1300':'#D3D3D3'}`}}>Sign Up</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                  setIsSignup(false);
                }}>
              <Text style={{...styles.buttonText,color:`${!isSignup ? '#1F1300':'#D3D3D3'}`}}>Sign In</Text>
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              id="username"
              label="Username"
              name="username"
              required
              minLength={3}
              autoCapitalize="none"
              errorText="Please enter a valid username."
              onChangeText={(value) => setUsername(value)}
              initialValue=""
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              id="password"
              label="Password"
              name="password"
              secureTextEntry
              required
              minLength={3}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onChangeText={(value) => setPassword(value)}
              initialValue=""
            />
            <View>
                <TouchableOpacity style={username.length < 3 || password.length < 3 ? styles.submitButtonContainerDisabled : styles.submitButtonContainer} 
                onPress={authHandler}
                // onPress={() =>{console.log('sign up')}}
                disabled={username.length < 3 || password.length < 3}
                >
                  <Text style={username.length < 3 || password.length < 3 ? styles.submitButtonTextDisabled : styles.submitButtonText}
                  >{isSignup ? "Sign Up" : "Sign In"}</Text>
                </TouchableOpacity>
            </View>
            {error && (
              <Text
                style={{
                  ...styles.errorText,
                  color: `${isSignup ? "#ff0033" : "#FFCCCC"}`,
                }}
              >
                {isSignup
                  ? `'${username}' is taken, be more creative!`
                  : "Incorrect username or password!"}
              </Text>
            )}
          </View>
        </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
    backgroundColor:'#F7F0FF',
  },
  title: {
    paddingVertical:"10%",
    marginTop:'75%',
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#F7934C",
  },
  container:{
    justifyContent:'space-between',
    height:'55%',
    paddingTop:"5%",
    paddingBottom:"22%",
    backgroundColor:'#F7934C',
    borderRadius:25,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer:{
    marginHorizontal:10,
    borderBottomWidth: 3,
    borderBottomColor:"#F8F7FF",
  },
  buttonText: {
    fontSize:20,
    fontWeight:'600',
    paddingBottom:7,
  },
  inputWrapper:{
    marginTop:'8%'
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 50,
    textAlign: "center",
    backgroundColor: "#F7F0FF",
    marginTop: 10,
    height: 50,
    fontSize: 20,
    marginHorizontal:10,
  },
  submitButtonContainer:{
    marginTop:'10%',
    alignItems:'center',
    borderBottomWidth:4,
    borderBottomColor:"#CC5803",
    marginHorizontal:"32%",
    borderRadius:50
  },
  submitButtonText:{
    fontSize: 24,
    color:"#F8F7FF",
  },
  submitButtonContainerDisabled:{
    marginTop:'10%',
    alignItems:'center',
    borderBottomWidth:4,
    borderBottomColor:"#CC5803",
    marginHorizontal:"32%",
    borderRadius:50
  },
  submitButtonTextDisabled:{
    fontSize:28,
    color:"#D3D3D3",
    paddingBottom:"3%",
  },
  errorText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
  },
});

AuthScreen.navigationOptions = (navData) => {
  return {
    header: null,
  };
};

export default AuthScreen;
