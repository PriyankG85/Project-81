import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "../components/StoryCard";

import { FlatList } from "react-native-gesture-handler";
import { currentGlobalStates } from "../Global_States";
import { useFocusEffect } from "@react-navigation/native";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

// let stories = require("../temp_stories.json");

const Feed = ({ navigation }) => {
  const [currentDarkTheme, setCurrentDarkTheme] = useState(
    currentGlobalStates.theme === "dark" ? true : false
  );
  const [dbStories, setDBStories] = useState([]);

  useFocusEffect(
    useCallback(
      () =>
        setCurrentDarkTheme(
          currentGlobalStates.theme === "dark" ? true : false
        ),
      []
    )
  );

  useEffect(() => {
    let allStories = [];

    onValue(ref(db, "stories"), (snapshot) => {
      snapshot.exists() &&
        snapshot.forEach((child) => {
          allStories.push(child.val());
        });

      setDBStories(allStories);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentDarkTheme ? "#15193c" : "#e5e5e5",
      }}
    >
      <SafeAreaView style={styles.droidSafeArea} />
      <View style={styles.appTitle}>
        <View
          style={{
            ...styles.appIcon,
            backgroundColor: currentDarkTheme ? "transparent" : "#000",
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={styles.iconImage}
          />
        </View>
        <View style={styles.appTitleTextContainer}>
          <Text
            style={{
              ...styles.appTitleText,
              color: currentDarkTheme ? "#fff" : "#000",
            }}
          >
            Storytelling App
          </Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={dbStories}
          keyExtractor={(item, i) => i}
          renderItem={({ item }) => (
            <StoryCard
              story={item}
              currentDarkTheme={currentDarkTheme}
              navigation={navigation}
            />
          )}
        />
      </View>
      <View style={{ flex: 0.08 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    paddingVertical: 5,
    flexDirection: "row",
  },
  appIcon: {
    padding: 8,
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  iconImage: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 1,
  },
});

export default Feed;
