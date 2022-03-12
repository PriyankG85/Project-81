import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PostScreen from "../screens/PostScreen";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TabNavigator" component={TabNavigator} />
    <Stack.Screen name="PostScreen" component={PostScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
