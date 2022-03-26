import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../config";
import { ref, set, get } from "firebase/database";

const LoadingScreen = ({ navigation }) => {
  const auth = getAuth(app);

  const setUserDetails = async (user) => {
    const allUsers = [];
    await get(ref(db, "users")).then((users) => {
      users.forEach((user) => {
        allUsers.push(user.val().gmail);
      });
    });

    if (!allUsers.includes(user.email)) {
      await set(ref(db, "users/" + user.uid), {
        gmail: user.email,
        profile_picture: user.photoURL,
        // locale: user.additionalUserInfo.profile.locale,
        first_name: user.displayName.slice(0, user.displayName.indexOf(" ")),
        last_name: user.displayName.slice(user.displayName.indexOf(" ")),
        current_theme: "dark",
      });

      navigation.navigate("DashboardScreen");
    } else navigation.navigate("DashboardScreen");
  };

  const checkUserLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      user ? setUserDetails(user) : navigation.navigate("LoginScreen");
    });
  };

  useEffect(() => checkUserLoggedIn(), []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={"#000000"} size={"large"} />
    </View>
  );
};

export default LoadingScreen;
