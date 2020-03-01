import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";

import * as authActions from "../store/actions/auth-actions";

import Colors from "../constants/Colors";

const AuthScreen = props => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert(
        "An Error Occurred!",
        "The function that you are trying to attempt is unavailable.",
        [{ text: "Okay" }]
      );
    }
  }, [error]);

  const authHandler = async () => {
    let action = authActions.verify(username, password, isSignup);
    if (username.length < 3 || password.length < 3) {
      setError(true);
    }
    if (username == undefined || password == undefined) {
      setError(true);
    }
    try {
      await dispatch(action);
      props.navigation.navigate("TutoringBlah");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={5}
      style={styles.screen}
    >
      <LinearGradient colors={["#FF99C8", "#E4C1F9"]} style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Welcome, {isSignup ? "Sign Up" : "Login"}
          </Text>
          <ScrollView>
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
              onChangeText={value => setUsername(value)}
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
              onChangeText={value => setPassword(value)}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primaryColor}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.primaryColor}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FCF6BD"
  },
  container: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    borderRadius: 10,
    shadowRadius: 8,
    shadowColor: "#CCCCCC",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 }
  },
  buttonContainer: {
    marginTop: 5,
    borderRadius: 50,
    paddingHorizontal: 1,
    paddingVertical: 3,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1
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
    fontSize: 20
  }
});

AuthScreen.navigationOptions = navData => {
  return {
    header: null
    // headerTitle: isSignup ? "Sign Up" : "Login"
  };
};

export default AuthScreen;
