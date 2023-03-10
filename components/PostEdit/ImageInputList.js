import React, { useRef } from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImageInput from "./ImageInput";

function changeCount(increment, img, func) {
  if (!increment) {
    // Remove image and decrement label
    func(img);
    postCount -= 1;
  } else {
    // Add image and increment label
    func(img);
    postCount += 1;
  }
}

function ImageInputList({ imageUris = [], addImage, removeImage }) {
  const scrollview = useRef();
  postCount = imageUris.length;

  return (
    <View style={styles.background}>
      <View style={styles.countContainer}>
        <Text style={styles.currentCount}>{postCount}</Text>
        <Text style={styles.totalCount}>/9</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          style={styles.scrollView}
          ref={scrollview}
          horizontal
          onContentSizeChange={() => scrollview.current.scrollToEnd()}
        >
          <View style={styles.imageContainer}>
            {imageUris.map((uri) => (
              <View key={uri} style={styles.image}>
                <ImageInput
                  imageUri={uri}
                  changeImage={() => changeCount(false, uri, removeImage)}
                  selectionLimit={9 - postCount}
                />
              </View>
            ))}
            {postCount < 9 ? (
              <ImageInput
                changeImage={(uri) => changeCount(true, uri, addImage)}
                selectionLimit={9 - postCount}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  ); 
}

const { height, width } = Dimensions.get("window");
var postCount = 0;

const styles = StyleSheet.create({
  background: {
    alignItems: "stretch",
    height: "100%",
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: -10,
  },
  currentCount: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "italic",
  },
  totalCount: {
    color: "#6F6B56",
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "italic",
  },
  scrollViewContainer: {
    backgroundColor: "#FFFDF4",
    marginHorizontal: 20,
    height: "100%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#6F6B56",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
  scrollView: {
    marginVertical: 8,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  imageContainer: {
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    marginRight: 5,
  },
});

export default ImageInputList;
