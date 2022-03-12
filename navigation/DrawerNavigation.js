import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" component={StackNavigator} />
    <Drawer.Screen name="Profile" component={Profile} />
  </Drawer.Navigator>
);

export default DrawerNavigation;
