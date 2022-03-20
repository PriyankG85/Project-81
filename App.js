import React, { useState } from "react";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

const switchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginScreen,
  DashboardScreen,
});

const AppNavigator = createAppContainer(switchNavigator);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  Font.loadAsync({
    RowdiesBold: require("./assets/fonts/Rowdies-Bold.ttf"),
    RowdiesRegular: require("./assets/fonts/Rowdies-Regular.ttf"),
    RowdiesLight: require("./assets/fonts/Rowdies-Light.ttf"),
  }).then(() => setLoaded(true));

  if (!loaded) {
    return <AppLoading />;
  }

  return <AppNavigator />;
}
