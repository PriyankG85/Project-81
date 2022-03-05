import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Profile from "../screens/Profile";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" component={TabNavigator} />
    <Drawer.Screen name="Profile" component={Profile} />
  </Drawer.Navigator>
);

export default DrawerNavigation;
