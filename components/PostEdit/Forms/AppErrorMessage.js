import React from "react";
import { StyleSheet, Text } from "react-native";

function AppErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { color: "red", alignSelf: "flex-start", marginLeft: 5, fontSize: 10 },
});

export default AppErrorMessage;
