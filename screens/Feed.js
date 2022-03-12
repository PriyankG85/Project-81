import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import PostCard from "../components/PostCard";
import { FlatList } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

const Feed = ({ navigation }) => {
  const posts = require("../temp__post.json");

  return (
    <View style={styles.container}>
      <View style={styles.appTitle}>
        <View style={styles.appIcon}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.iconImage}
          />
        </View>
        <View style={styles.appTitleTextContainer}>
          <Text style={styles.appTitleText}>Spectagram</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          style={{ paddingHorizontal: 20 }}
          data={posts}
          keyExtractor={(item, i) => i}
          renderItem={({ item }) => <PostCard post={item} navigation={navigation} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b6ccfe",
  },

  appTitle: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  appIcon: {},

  iconImage: {
    width: 50,
    height: 50,
  },

  appTitleTextContainer: {},

  appTitleText: {
    color: "#14213d",
    paddingLeft: 14,
    fontSize: RFValue(26),
    fontFamily: "RowdiesRegular",
  },

  cardContainer: {
    flex: 1,
  },
});

export default Feed;
