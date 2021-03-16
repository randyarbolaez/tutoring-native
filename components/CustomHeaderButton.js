import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={34}
    color={Platform.OS === "android" ? "white" : "#FFD8BE"}
  />
);

export default CustomHeaderButton;
