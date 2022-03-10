import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "../screens/Feed";
import CreatePost from "../screens/CreatePost";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    labeled={false}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, focused }) => {
        let iconName;
        if (route.name === "Feed") {
          iconName = focused ? "book" : "book-outline";
        } else if (route.name === "CreatePost") {
          iconName = focused ? "create" : "create-outline";
        }

        return (
          <Ionicons
            name={iconName}
            color={color}
            size={RFValue(25)}
            style={{ width: 30, height: 30 }}
          />
        );
      },
    })}
    activeColor={"white"}
    inactiveColor={"black"}
  >
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="CreatePost" component={CreatePost} />
  </Tab.Navigator>
);

export default TabNavigator;
