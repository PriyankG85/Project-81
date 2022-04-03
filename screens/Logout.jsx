import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { signOut, getAuth } from "firebase/auth";
import { app } from "../config";

const Logout = () => {
  const currentUser = getAuth(app).currentUser;

  const logout = () => {
    signOut(getAuth(app));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.confirmationText}>
        Sure to Logout{" "}
        {currentUser.displayName[0].toUpperCase() +
          currentUser.displayName.slice(
            1,
            currentUser.displayName.indexOf(" ")
          )}
        ?
      </Text>
      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmationText: {
    fontSize: 24,
    fontFamily: "RowdiesBold",
  },

  logoutBtn: {
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: "#000000",
    borderRadius: 4,
  },

  logoutText: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "BubblegumSans",
  },
});

export default Logout;
