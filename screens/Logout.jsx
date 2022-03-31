import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import { signOut, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";
import { currentGlobalStates } from "../Global_States";

const Logout = ({ navigation }) => {
  const auth = getAuth(app);

  const [currentDarkTheme, setCurrentDarkTheme] = useState(
    currentGlobalStates.theme === "dark" ? true : false
  );

  useFocusEffect(
    useCallback(
      () =>
        setCurrentDarkTheme(
          currentGlobalStates.theme === "dark" ? true : false
        ),
      []
    )
  );

  const logout = () => {
    signOut(auth);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: "30%",
        backgroundColor: currentDarkTheme ? "#15193c" : "#edf2f4",
      }}
    >
      <Text
        style={{
          ...styles.title,
          color: currentDarkTheme ? "#edf2f4" : "#15193c",
        }}
      >
        Are you Sure want to LOGOUT??
      </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={logout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: "10%",
    fontFamily: "Rowdies-Regular",
  },

  btnContainer: {
    paddingTop: 50,
    flexDirection: "row",
    paddingHorizontal: "15%",
    justifyContent: "space-between",
  },

  btn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#023e8a",
  },

  btnText: {
    fontSize: 15,
    color: "#ffffff",
    fontFamily: "Bubblegum-Sans",
  },
});

export default Logout;
