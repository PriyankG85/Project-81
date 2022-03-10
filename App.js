import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  StatusBar as RStatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/DrawerNavigation";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

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

  return (
    <NavigationContainer style={styles.container}>
      <SafeAreaView style={styles.safeAreaView} />
      <DrawerNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3f4",
    alignItems: "center",
    justifyContent: "center",
  },

  safeAreaView: {
    marginTop: Platform.OS === "android" ? RStatusBar.currentHeight : 0,
  },
});
