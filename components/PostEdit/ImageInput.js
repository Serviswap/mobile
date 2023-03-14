import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as ExpoImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";

function ImageInput({ imageUri, changeImage, selectionLimit }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the photo.");
    else {
      return;
    }
  };

  const handlePress = async () => {
    try {
      if (!imageUri) {
        const result = await ExpoImagePicker.launchImageLibraryAsync({
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
          allowsMultipleSelection: true,
          selectionLimit: selectionLimit,
        });

        if (!result.canceled) {
          manipulated = await Promise.all(result.assets.map(async imageResult =>
            await manipulateAsync(
              imageResult.uri,
              [{ rotate: 360 }],
            )
          ))
          changeImage(manipulated.map(image => image.uri));
        }
      } else {
        Alert.alert("Deletion", "Are you sure you want to delete the item?", [
          { text: "Yes", onPress: () => changeImage(null) },
          { text: "No" },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* const selectImage = async () => {
    try {
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) changeImage(result.uri);
    } catch (error) {}
  }; */

  return (
    <TouchableWithoutFeedback onPress={() => handlePress()}>
      {!imageUri ? (
        <View style={styles.emptyArea}>
          <Image source={require("../../assets/addSign.png")} />
        </View>
      ) : (
        <View style={styles.imageArea}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
    </TouchableWithoutFeedback>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  imageArea: {
    height: "100%",
    width: screenWidth / 3.8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  emptyArea: {
    height: "100%",
    width: screenWidth / 3.8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#E1DCB0",
  },
});

export default ImageInput;
