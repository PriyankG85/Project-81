import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { app, db } from "../config";

const PostScreen = ({ route }) => {
  const post = route.params.post;

  const currentUser = getAuth(app).currentUser;
  const [currentDarkTheme, setCurrentDarkTheme] = useState(true);

  const getUserCurrentTheme = () => {
    onValue(ref(db, "users/" + currentUser.uid), (snapshot) => {
      setCurrentDarkTheme(
        snapshot.val().current_theme === "dark" ? true : false
      );
    });
  };

  useEffect(() => getUserCurrentTheme(), []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: currentDarkTheme ? "#14213d" : "#61a5c2",
      }}
    >
      <View style={styles.authorContainer}>
        <View style={styles.authorImageContainer}>
          <Image
            source={require("../assets/profile_img.png")}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.authorNameContainer}>
          <Text style={styles.authorNameText}>{post.author}</Text>
        </View>
      </View>

      <Image source={require("../assets/post.jpeg")} style={styles.postImage} />

      <View style={styles.bottomContainer}>
        <View style={styles.captionsContainer}>
          <Text style={styles.captionText}>{post.caption}</Text>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.likeButton}>
            <Ionicons name="heart" color="red" size={RFValue(30)} />
            <Text style={styles.likeText}>12k</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  authorContainer: {
    width: "100%",
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  authorImageContainer: {
    width: 50,
    height: 50,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 999,
  },

  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },

  authorNameContainer: {
    marginLeft: 12,
  },

  authorNameText: {
    fontSize: 22,
    color: "white",
  },

  postImage: {
    width: "100%",
    height: "60%",
    borderRadius: 3,
  },

  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-between",
  },

  captionsContainer: {
    flexGrow: 1,
    maxWidth: "68%",
    paddingRight: 6,
    justifyContent: "center",
  },

  captionText: {
    fontSize: 18,
    color: "white",
    fontFamily: "BubblegumSans",
  },

  actionContainer: {},

  likeButton: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    flexDirection: "row",
    backgroundColor: "#ffccd5",
    borderRadius: 5,
  },

  likeText: {
    color: "#000",
    fontSize: 19,
    fontWeight: "bold",
    paddingLeft: 7,
  },
});

export default PostScreen;
