import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useState, useEffect } from "react";
import Logout from "../screens/Logout";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { app, db } from "../config";
import CustomizedDrawer from "../components/CustomizedDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const currentUser = getAuth(app).currentUser;
  const [currentDarkTheme, setCurrentDarkTheme] = useState(true);

  const getUserCurrentTheme = () => {
    onValue(ref(db, "users/" + currentUser.uid), (snapshot) => {
      setCurrentDarkTheme(
        snapshot.val().current_theme === "dark" ? true : false
      );
    });
  };

  useEffect(() => getUserCurrentTheme(), []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomizedDrawer {...props} />}
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,

        drawerActiveBackgroundColor: currentDarkTheme ? "#001219" : "#14213d",
        drawerInactiveBackgroundColor: currentDarkTheme ? "#005f73" : "#6c757d",
        drawerActiveTintColor: "#efefef",
        drawerInactiveTintColor: "#efefef",

        drawerStyle: {
          width: "70%",
          paddingTop: "10%",
          backgroundColor: currentDarkTheme ? "#14213d" : "#e5e5e5",
        },
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
