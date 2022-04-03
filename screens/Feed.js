import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { FlatList } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { app, db } from "../config";

const Feed = ({ navigation }) => {
  // const posts = require("../temp__post.json");

  const currentUser = getAuth(app).currentUser;
  const [currentDarkTheme, setCurrentDarkTheme] = useState(true);
  const [posts, setPosts] = useState([]);

  const getUserCurrentTheme = () => {
    onValue(ref(db, "users/" + currentUser.uid), (snapshot) => {
      setCurrentDarkTheme(
        snapshot.val().current_theme === "dark" ? true : false
      );
    });
  };

  const fetchPosts = () => {
    let allPosts = [];

    onValue(ref(db, "posts"), (snapshot) => {
      snapshot.exists() &&
        snapshot.forEach((post) => {
          allPosts.push(post.val());
        });

      setPosts(allPosts);
    });
  };

  useEffect(() => {
    getUserCurrentTheme();
    fetchPosts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentDarkTheme ? "#14213d" : "#b6ccfe",
      }}
    >
      <View style={styles.appTitle}>
        <View>
          <Image
            source={require("../assets/logo.png")}
            style={styles.iconImage}
          />
        </View>
        <View>
          <Text
            style={{
              ...styles.appTitleText,
              color: currentDarkTheme ? "aliceblue" : "#14213d",
            }}
          >
            Spectagram
          </Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          style={{ paddingHorizontal: 14 }}
          data={posts}
          keyExtractor={(item, i) => i}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              navigation={navigation}
              currentDarkTheme={currentDarkTheme}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  iconImage: {
    width: 50,
    height: 50,
  },

  appTitleText: {
    paddingLeft: 14,
    fontSize: RFValue(27),
    fontFamily: "RowdiesRegular",
  },

  cardContainer: {
    flex: 1,
  },
});

export default Feed;
