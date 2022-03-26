import { View, Text, Switch, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { app, db } from "../config";
import { getAuth } from "firebase/auth";
import { get, ref, update } from "firebase/database";

const Profile = () => {
  const currentUser = getAuth(app).currentUser;
  const [darkTheme, setDarkTheme] = useState(true);

  const fetchUserDetails = async () => {
    await get(ref(db, "users/" + currentUser.uid)).then((user) =>
      setDarkTheme(user.val().current_theme === "dark" ? true : false)
    );
  };

  useEffect(() => fetchUserDetails(), []);

  const toggleTheme = async () => {
    setDarkTheme(darkTheme ? false : true);

    await update(ref(db, "users/" + currentUser.uid), {
      current_theme: darkTheme ? "light" : "dark",
    });
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: darkTheme ? "#14213d" : "#fff",
      }}
    >
      <Image style={styles.userImage} source={{ uri: currentUser.photoURL }} />
      <Text style={{ ...styles.userName, color: darkTheme ? "#fff" : "#000" }}>
        {currentUser.displayName}
      </Text>
      <View style={styles.toggleThemeContainer}>
        <Text
          style={{
            ...styles.toggleThemeText,
            color: darkTheme ? "#fff" : "#000",
          }}
        >
          toggle theme
        </Text>
        <Switch
          value={darkTheme}
          trackColor={{ false: "#000", true: "#fff" }}
          thumbColor={darkTheme ? "#023047" : "#fff"}
          onValueChange={toggleTheme}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  userImage: {
    width: 120,
    height: 120,
    borderRadius: 999,
  },

  userName: {
    marginTop: 30,
    fontSize: 22,
    fontFamily: "RowdiesRegular",
  },

  toggleThemeContainer: {
    flexDirection: "row",
  },

  toggleThemeText: {
    fontSize: 18,
    fontFamily: "BubblegumSans",
  },
});

export default Profile;
