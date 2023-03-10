import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

function NavHeader({}) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerRegion}>
      <View style={styles.container}> 
        <View style={styles.backButtonContainer}>
          <View style={styles.backButton}>
            <TouchableWithoutFeedback
              style={styles.icon}
              onPress={() => navigation.navigate("Explore")}
            >
              <MaterialIcons name="arrow-back-ios" size={20} color={"grey"} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Text style={styles.middleText}>
          CREATE A POST
        </Text> 
        <View style={styles.rightEmptySpace}>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRegion: {
    alignItems: "stretch",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 5
  },
  backButtonContainer: {
    flex: 0.25,
  },
  backButton: {
    width: "20%"
  },
  middleText: {
    color: "#6F6B56",
    fontSize: 17,
    fontWeight: "bold",
    flex: 0.50,
    textAlign: "center",
  },
  rightEmptySpace: {
    flex: 0.25,
  },
  icon: {
    backgroundColor: "red"
  },
});

export default NavHeader;
