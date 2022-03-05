import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import CreatePost from "../screens/CreatePost";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ size, color, focused }) => {
        let iconName;
        if (route.name === "Feed") {
          iconName = focused ? "book" : "book-outline";
        } else if (route.name === "CreatePost") {
          iconName = focused ? "create" : "create-outline";
        }

        return <Ionicons name={iconName} color={color} size={size} />;
      },
      tabBarStyle: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      },
    })}
  >
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="CreatePost" component={CreatePost} />
  </Tab.Navigator>
);

export default TabNavigator;
