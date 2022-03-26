import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

const PostCard = ({ post, navigation, currentDarkTheme }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: currentDarkTheme ? "#023047" : "#61a5c2",
      }}
      onPress={() => navigation.push("PostScreen", { post })}
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
          <Text style={styles.captionText} numberOfLines={3}>
            {post.caption}
          </Text>
        </View>

        <View style={styles.likeButton}>
          <Ionicons name="heart" color="red" size={RFValue(30)} />
          <Text style={styles.likeText}>12k</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 500,
    padding: 10,
    borderRadius: 7,
    marginBottom: 20,
    alignItems: "center",
  },

  authorContainer: {
    width: "100%",
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  authorImageContainer: {
    width: 45,
    height: 45,
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
    fontFamily: "RowdiesLight",
  },

  postImage: {
    width: "100%",
    minHeight: 250,
    maxHeight: 300,
    borderRadius: 3,
  },

  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
  },

  captionsContainer: {
    flexGrow: 1,
    paddingRight: 6,
    justifyContent: "center",
    maxWidth: "70%",
  },

  captionText: {
    fontSize: 18,
    color: "white",
    fontFamily: "BubblegumSans",
  },

  likeButton: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    flexDirection: "row",
  },

  likeText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    paddingLeft: 7,
  },
});

export default PostCard;
