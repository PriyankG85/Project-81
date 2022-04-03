import { View, Image } from "react-native";
import React from "react";
import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

const CustomizedDrawer = (props) => (
  <View style={{ flex: 1 }}>
    <View style={{ alignItems: "center" }}>
      <Image
        style={{ width: 100, height: 100 }}
        source={require("../assets/logo.png")}
      />
    </View>

    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  </View>
);

export default CustomizedDrawer;
