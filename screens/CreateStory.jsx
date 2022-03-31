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
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";
import { currentGlobalStates } from "../Global_States";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { app, db } from "../firebase";

const CreateStory = () => {
  const currentUser = getAuth(app).currentUser;

  const [previewImage, setPreviewImage] = useState("image_1");
  const [dropDownHeight, setDropDownHeight] = useState(40);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [story, setStory] = useState("");
  const [moral, setMoral] = useState("");
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

  const previewImages = {
    image_1: require("../assets/image_1.png"),
    image_2: require("../assets/image_2.png"),
    image_3: require("../assets/image_3.png"),
    image_4: require("../assets/image_4.png"),
    image_5: require("../assets/image_5.png"),
  };

  const handleSubmit = async () => {
    const today = new Date();
    const uid = today.getTime().toString();

    await set(ref(db, "stories/" + uid), {
      title: title,
      story: story,
      moral: moral,
      description: desc,
      preview_image: previewImage,
      author: currentUser.displayName,
      author_uid: currentUser.uid,
      created_on: today.toDateString(),
      likes: 0,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentDarkTheme ? "#15193c" : "#edf2f4",
      }}
    >
      <SafeAreaView style={styles.droidSafeArea} />
      <View style={styles.appTitle}>
        <View
          style={{
            ...styles.appIcon,
            backgroundColor: currentDarkTheme ? "transparent" : "#15193c",
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
              color: currentDarkTheme ? "#edf2f4" : "#15193c",
            }}
          >
            New Story
          </Text>
        </View>
      </View>
      <View style={styles.fieldsContainer}>
        <ScrollView>
          <Image
            source={previewImages[previewImage]}
            style={styles.previewImage}
          />
          <View style={{ height: RFValue(dropDownHeight) }}>
            <DropDownPicker
              items={[
                { label: "Image 1", value: "image_1" },
                { label: "Image 2", value: "image_2" },
                { label: "Image 3", value: "image_3" },
                { label: "Image 4", value: "image_4" },
                { label: "Image 5", value: "image_5" },
              ]}
              defaultValue={previewImage}
              containerStyle={{
                height: 40,
                marginBottom: 10,
              }}
              onOpen={() => setDropDownHeight(170)}
              onClose={() => setDropDownHeight(40)}
              style={{
                backgroundColor: "transparent",
                borderColor: "#2f345d",
                borderWidth: 2,
                borderRadius: 10,
              }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{
                backgroundColor: currentDarkTheme ? "#15193c" : "#ced4da",
                borderWidth: 0,
              }}
              labelStyle={{
                color: currentDarkTheme ? "#edf2f4" : "#15193c",
                fontSize: 20,
                fontFamily: "Bubblegum-Sans",
              }}
              arrowColor={currentDarkTheme ? "#edf2f4" : "#15193c"}
              arrowSize={RFValue(22)}
              arrowStyle={{
                width: 22,
                height: 22,
              }}
              onChangeItem={(item) => setPreviewImage(item.value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={{
                ...styles.title,
                color: currentDarkTheme ? "#edf2f4" : "#15193c",
              }}
              value={title}
              onChangeText={(e) => setTitle(e)}
              placeholder={"Enter the Story Title"}
              placeholderTextColor={"#6c757d"}
            />
            <TextInput
              style={{
                ...styles.desc,
                color: currentDarkTheme ? "#edf2f4" : "#15193c",
              }}
              value={desc}
              onChangeText={(e) => setDesc(e)}
              placeholder={"Enter the Story description"}
              placeholderTextColor={"#6c757d"}
            />
            <TextInput
              style={{
                ...styles.story,
                color: currentDarkTheme ? "#edf2f4" : "#15193c",
              }}
              value={story}
              onChangeText={(e) => setStory(e)}
              placeholder={"Enter Your Story"}
              placeholderTextColor={"#6c757d"}
            />
            <TextInput
              style={{
                ...styles.moral,
                color: currentDarkTheme ? "#edf2f4" : "#15193c",
              }}
              value={moral}
              onChangeText={(e) => setMoral(e)}
              placeholder={"Enter the Story Moral"}
              placeholderTextColor={"#6c757d"}
            />
          </View>

          <View style={styles.submitBtnContainer}>
            <TouchableOpacity
              disabled={
                title.length === 0 ||
                story.length === 0 ||
                moral.length === 0 ||
                desc.length === 0
              }
              style={{
                ...styles.submitBtn,
                opacity:
                  title.length === 0 ||
                  story.length === 0 ||
                  moral.length === 0 ||
                  desc.length === 0
                    ? 0.5
                    : 1,
              }}
              onPress={handleSubmit}
            >
              <Text style={styles.submitBtnText}>Submit Story</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    color: "#ffffff",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },

  fieldsContainer: {
    flex: 0.85,
    padding: 10,
  },

  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },

  inputContainer: {
    marginTop: 10,
  },

  title: {
    padding: 10,
    fontSize: 20,
    fontFamily: "Bubblegum-Sans",
  },

  desc: {
    padding: 10,
    fontSize: 20,
    fontFamily: "Bubblegum-Sans",
  },

  story: {
    padding: 10,
    fontSize: 20,
    fontFamily: "Bubblegum-Sans",
  },

  moral: {
    padding: 10,
    fontSize: 20,
    fontFamily: "Bubblegum-Sans",
  },

  submitBtnContainer: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  submitBtn: {
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#2f345d",
  },

  submitBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Rowdies-Light",
  },
});

export default CreateStory;
