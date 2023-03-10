import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function PostEditButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      style={{ position: "absolute", bottom: 50 }}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Ionicons name="add" color={"white"} size={30} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#AFDAF2",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
});

export default PostEditButton;
