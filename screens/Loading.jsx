import { View, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { db } from "../firebase";
import { get, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const Loading = ({ navigation }) => {
  const user = getAuth().currentUser;

  const pushUserDetails = async () => {
    const users = [];
    await get(ref(db, "users")).then((res) =>
      res.forEach((usr) => {
        users.push(usr.val().gmail);
      })
    );

    if (!users.includes(user.email)) {
      await set(ref(db, "users/" + user.uid), {
        gmail: user.email,
        profile_picture: user.photoURL,
        // locale: user.locale,
        first_name: user.displayName.slice(0, user.displayName.indexOf(" ")),
        last_name: user.displayName.slice(user.displayName.indexOf(" ") + 1),
        current_theme: "dark",
      });

      navigation.push("TabNavigator");
    } else {
      navigation.push("TabNavigator");
    }
  };

  useEffect(() => pushUserDetails(), []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.loadingImg}
        source={{
          uri: "https://img.icons8.com/external-kmg-design-outline-color-kmg-design/344/external-refresh-arrow-kmg-design-outline-color-kmg-design-2.png",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf2f4",
  },
  loadingImg: {
    width: 60,
    height: 60,
  },
});

export default Loading;
