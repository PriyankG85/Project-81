import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as Google from "expo-google-app-auth";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { app } from "../firebase";

const Login = () => {
  const signIn = async () => {
    const result = await Google.logInAsync({
      behavior: "web",
      androidClientId:
        "808812086765-63736vh9grc34fltjg1v923q6hhlm35i.apps.googleusercontent.com",
      iosClientId:
        "808812086765-pkhcmkumld93f0kecmra596l5v5p1e9q.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result?.type === "success") {
      const auth = getAuth(app);
      const credential = GoogleAuthProvider.credential(
        result.idToken,
        result.accessToken
      );

      await signInWithCredential(auth, credential);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signin with Google</Text>
      <TouchableOpacity onPress={() => signIn()} style={styles.signInBtn}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 160,
    backgroundColor: "#edf2f4",
    alignItems: "center",
  },

  title: {
    fontSize: 27,
    fontFamily: "Rowdies-Regular",
  },

  signInBtn: {
    marginTop: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#48cae4",
  },

  btnText: {
    fontSize: 22,
    color: "#ffffff",
    fontFamily: "Rowdies-Light",
  },
});

export default Login;
