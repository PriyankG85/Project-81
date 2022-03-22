import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Logout from "../screens/Logout";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => (
  <Drawer.Navigator
    initialRouteName={"Profile"}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="Home" component={StackNavigator} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="Logout" component={Logout} />
  </Drawer.Navigator>
);

export default DrawerNavigation;
