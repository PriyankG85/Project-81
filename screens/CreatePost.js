import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";

const CreatePost = () => {
  const [previewImage, setPreviewImage] = useState("image_1");
  const [dropDownHeight, setDropDownHeight] = useState(40);
  const [caption, setCaption] = useState("");

  const preview__image__src = {
    image_1: require("../assets/image_1.jpg"),
    image_2: require("../assets/image_2.jpg"),
    image_3: require("../assets/image_3.jpg"),
    image_4: require("../assets/image_4.jpg"),
    image_5: require("../assets/image_5.jpg"),
    image_6: require("../assets/image_6.jpg"),
    image_7: require("../assets/image_7.jpg"),
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.title}>New Post</Text>
      </View>

      <ScrollView style={styles.fieldsContainer}>
        <Image
          style={styles.previewImg}
          source={preview__image__src[previewImage]}
        />

        <View style={{ height: RFValue(dropDownHeight) }}>
          <DropDownPicker
            items={[
              { label: "Image 1", value: "image_1" },
              { label: "Image 2", value: "image_2" },
              { label: "Image 3", value: "image_3" },
              { label: "Image 4", value: "image_4" },
              { label: "Image 5", value: "image_5" },
              { label: "Image 6", value: "image_6" },
              { label: "Image 7", value: "image_7" },
            ]}
            defaultValue={previewImage}
            containerStyle={{
              height: 40,
              borderRadius: 20,
              marginBottom: 10,
            }}
            onOpen={() => setDropDownHeight(200)}
            onClose={() => setDropDownHeight(40)}
            style={{
              backgroundColor: "transparent",
              paddingVertical: 0,
              borderWidth: 1.5,
              borderRadius: 6,
              borderColor: "#ffccd5",
            }}
            itemsStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{
              backgroundColor: "transparent",
            }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            labelStyle={{
              fontSize: 20,
              fontFamily: "RowdiesLight",
              color: "#fff0f3",
            }}
            activeLabelStyle={{
              color: "#ffffff",
              fontFamily: "RowdiesBold",
            }}
            arrowColor={"white"}
            onChangeItem={(item) => setPreviewImage(item.value)}
          />
        </View>

        <View>
          <TextInput
            style={styles.captionInput}
            placeholder={"Write a caption"}
            value={caption}
            onChangeText={(e) => setCaption(e)}
            placeholderTextColor={"#ffccd5"}
            multiline={true}
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ff758f",
  },

  screenTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 50,
    height: 50,
  },

  title: {
    color: "white",
    paddingLeft: 15,
    fontSize: RFValue(26),
    fontFamily: "RowdiesRegular",
  },

  fieldsContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 10,
  },

  previewImg: {
    width: "80%",
    alignSelf: "center",
    height: 200,
    marginBottom: 40,
  },

  captionInput: {
    marginTop: 30,
    fontSize: 20,
    padding: 5,
    paddingTop: 10,
    textAlign: "center",
    borderWidth: 1.5,
    borderRadius: 6,
    color: "#ffffff",
    borderColor: "#ffccd5",
    fontFamily: "RowdiesRegular",
  },
});

export default CreatePost;
