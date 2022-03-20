import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import * as Google from "expo-google-app-auth";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { app } from "../config";

const LoginScreen = () => {
  const auth = getAuth(app);

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "979616018436-fekvhojh1gu864p7jd1nvkie7udgbsca.apps.googleusercontent.com",
        iosClientId:
          "979616018436-ekg3moohfnnd40ishejc6i4jk7ter815.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const onSignIn = async (userCred) => {
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   unsubscribe();
    // if (!isUserEqual(userCred, user)) {
    const credential = GoogleAuthProvider.credential(
      userCred.idToken,
      userCred.accessToken
    );

    await signInWithCredential(auth, credential);
    // .then(async (res) => {
    //   if (res.additionalUserInfo.isNewUser) {
    //     await set(ref(db, "users/" + res.user.uid), {
    //       gmail: res.user.email,
    //       profile_picture: res.additionalUserInfo.profile.picture,
    //       locale: res.additionalUserInfo.profile.locale,
    //       first_name: res.additionalUserInfo.profile.given_name,
    //       last_name: res.additionalUserInfo.profile.family_name,
    //       // current_theme: "dark",
    //     });
    //   }
    // })
    // } else Alert.alert("user equal!!");
    //   });
  };

  // const isUserEqual = (googleUser, firebaseUser) => {
  //   if (firebaseUser) {
  //     var providerData = firebaseUser.providerData;
  //     for (var i = 0; i < providerData.length; i++) {
  //       if (
  //         providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
  //         providerData[i].uid === googleUser.getBasicProfile().getId()
  //       ) {
  //         // We don't need to reauth the Firebase connection.
  //         return true;
  //       }
  //     }
  //   }

  //   return false;
  // };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 25, fontFamily: "RowdiesRegular" }}>
        LogIn With Google
      </Text>
      <TouchableOpacity
        onPress={signInWithGoogleAsync}
        style={{
          marginTop: 40,
          backgroundColor: "dodgerblue",
          paddingHorizontal: 10,
          borderRadius: 7,
        }}
        activeOpacity={0.7}
      >
        <Text
          style={{ fontSize: 20, color: "#ffffff", fontFamily: "RowdiesLight" }}
        >
          LogIn
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
