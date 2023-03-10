import React from "react";
import { View, StyleSheet } from "react-native";

function Separator({ style }) {
  return <View style={[styles.container, style]}></View>;
}

const styles = StyleSheet.create({
  container: { width: "100%", height: 1, backgroundColor: "#E1DCB0" },
});

export default Separator;
