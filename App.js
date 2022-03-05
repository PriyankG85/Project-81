import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./navigation/DrawerNavigation";

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
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
});
