import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { get, ref, update } from "firebase/database";
import { db } from "../firebase";

const Profile = ({ navigation }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const fetchUserDetails = async () => {
    let themeisdark;

    await get(ref(db, "users/" + currentUser.uid)).then((user) => {
      themeisdark = user.val().current_theme === "dark" ? true : false;
    });

    setIsDarkTheme(themeisdark);
  };

  useEffect(() => fetchUserDetails(), []);

  const toggleTheme = async () => {
    setIsDarkTheme(isDarkTheme ? false : true);

    await update(ref(db, "users/" + currentUser.uid), {
      current_theme: isDarkTheme ? "light" : "dark",
    });
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkTheme ? "#15193c" : "#e9ecef",
      }}
    >
      <Image source={{ uri: currentUser.photoURL }} style={styles.image} />
      <View style={styles.NameContainer}>
        <Text
          style={{
            ...styles.displayName,
            color: isDarkTheme ? "#e9ecef" : "#15193c",
          }}
        >
          {currentUser.displayName}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          ...styles.logOutBtn,
          borderColor: "#ffffff",
          borderWidth: isDarkTheme ? 1 : 0,
        }}
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Logout")}
      >
        <Text style={styles.logOutBtnText}>LogOut</Text>
      </TouchableOpacity>
      <View style={styles.themeSwitchContainer}>
        <Text
          style={{
            ...styles.themeToggleText,
            color: isDarkTheme ? "#e9ecef" : "#15193c",
          }}
        >
          Toggle Theme
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#000000", true: "#e9ecef" }}
          thumbColor={isDarkTheme ? "#3f37c9" : "#fefae0"}
          onValueChange={() => toggleTheme()}
          value={isDarkTheme}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 9999,
  },

  NameContainer: {
    paddingTop: 20,
    alignItems: "center",
  },

  displayName: {
    fontSize: 28,
    paddingLeft: 12,
    fontFamily: "Rowdies-Regular",
  },

  logOutBtn: {
    marginTop: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#001219",
    borderRadius: 10,
  },

  logOutBtnText: {
    color: "#ffffff",
    fontSize: 19,
    fontFamily: "Bubblegum-Sans",
  },

  themeSwitchContainer: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  themeToggleText: {
    fontSize: 25,
    color: "#15193c",
    paddingRight: 30,
    fontFamily: "Bubblegum-Sans",
  },
});

export default Profile;
