import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import TutoringScreen from "../screen/TutoringScreen";
import AddTutoringScreen from "../screen/AddTutoringScreen";

import StartupScreen from "../screen/StartupScreen";
import AuthScreen from "../screen/AuthScreen";

import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#555e69" : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "#555e69",
};

const TutoringNavigator = createStackNavigator(
  {
    Tutoring: TutoringScreen,
    AddTutoring: AddTutoringScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  TutoringBlah: TutoringNavigator,
});

export default createAppContainer(MainNavigator);
