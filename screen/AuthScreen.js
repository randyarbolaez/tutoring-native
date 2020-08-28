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
      <LinearGradient
        colors={isSignup ? ["#FF99C8", "#E4C1F9"] : ["#EE82EE", "#DC143C"]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            {isSignup ? "Welcome,    Sign Up" : "Welcome Back, Login"}
          </Text>
          <View>
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
            <View style={styles.buttonWrapper}>
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  <Button
                    title={isSignup ? "Sign Up" : "Login"}
                    disabled={username.length < 3 || password.length < 3}
                    color={Colors.accentColor}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                  color={Colors.accentColor}
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
              </View>
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
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 36.8,
    fontWeight: "bold",
    color: "#FCF6BD",
  },
  container: {
    // transform: [{ rotate: "11deg" }],
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    borderRadius: 10,
    shadowRadius: 8,
    shadowColor: "#CCCCCC",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 10,
    // borderRadius: 50,
    // paddingHorizontal: 1,
    // paddingVertical: 3,
    // borderLeftWidth: 1,
    // borderBottomWidth: 1,
    // borderRightWidth: 1,
    // backgroundColor: "#F7F0FF"
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
    // headerTitle: isSignup ? "Sign Up" : "Login"
  };
};

export default AuthScreen;
