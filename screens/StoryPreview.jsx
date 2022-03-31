import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Speech from "expo-speech";
import { useFocusEffect } from "@react-navigation/native";
import { currentGlobalStates } from "../Global_States";

const StoryScreen = ({ route }) => {
  const [speakerColor, setSpeakerColor] = useState("gray");
  const [speakerIcon, setSpeakerIcon] = useState("volume-high-outline");
  const [currentDarkTheme, setCurrentDarkTheme] = useState(
    currentGlobalStates.theme === "dark" ? true : false
  );

  useFocusEffect(
    useCallback(
      () =>
        setCurrentDarkTheme(
          currentGlobalStates.theme === "dark" ? true : false
        ),
      []
    )
  );

  const handleSpeech = async () => {
    speakerColor === "gray"
      ? setSpeakerColor("#ee8249")
      : setSpeakerColor("gray");

    if (speakerColor === "gray") {
      Speech.speak(
        `${route.params.story.title} by ${route.params.story.author}`
      );
      Speech.speak(route.params.story.story);
      Speech.speak("The moral of the story is!");
      Speech.speak(route.params.story.moral);
    } else {
      Speech.stop();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentDarkTheme ? "#15193c" : "#fff",
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
          ></Image>
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
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            ...styles.storyCard,
            backgroundColor: currentDarkTheme ? "#2f345d" : "#ccdbfd",
          }}
        >
          <Image
            style={styles.image}
          ></Image>

          <View style={styles.dataContainer}>
            <View style={styles.titleTextContainer}>
              <Text
                style={{
                  ...styles.storyTitleText,
                  color: currentDarkTheme ? "#fff" : "#000",
                }}
              >
                {route.params.story.title}
              </Text>
              <Text
                style={{
                  ...styles.storyAuthorText,
                  color: currentDarkTheme ? "#fff" : "#000",
                }}
              >
                {route.params.story.author}
              </Text>
              <Text
                style={{
                  ...styles.storyAuthorText,
                  color: currentDarkTheme ? "#fff" : "#000",
                }}
              >
                {route.params.story.created_on}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleSpeech}>
                <Ionicons
                  name={speakerIcon}
                  size={RFValue(30)}
                  color={speakerColor}
                  style={{ margin: RFValue(15) }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.storyTextContainer}>
            <Text
              style={{
                ...styles.storyText,
                color: currentDarkTheme ? "#fff" : "#000",
              }}
            >
              {route.params.story.story}
            </Text>
            <Text
              style={{
                ...styles.moralText,
                color: currentDarkTheme ? "#fff" : "#000",
              }}
            >
              Moral - {route.params.story.moral}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
              <Text style={styles.likeText}>12k</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
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
  storyCard: {
    margin: RFValue(20),
    borderRadius: RFValue(20),
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain",
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20),
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTextContainer: {
    padding: RFValue(20),
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "#ffffff",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});

export default StoryScreen;
