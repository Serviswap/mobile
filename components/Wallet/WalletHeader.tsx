import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

function WalletHeader({}) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerRegion}>
        <Image source = {require('../../assets/exploreClouds.png')} style={styles.clouds} />
        <View style={styles.backButton}>
          <TouchableWithoutFeedback
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back-ios" size={20} color={"grey"} />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.header}>WALLET</Text>    
    </View>
  );
}

const styles = StyleSheet.create({
    headerRegion: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "flex-start",
        marginHorizontal: 20,
        backgroundColor: "#FFF8BB",
    },
    clouds: {
        position: "absolute",
        marginTop: -40,
        zIndex: -10,
    },
    backButton: {
        flex: 0.25,
    },
    header: {
        color: "#6F6B56",
        fontSize: 20,
        fontWeight: "bold",
        flex: 0.5,
        textAlign: "center"
    },
});

export default WalletHeader;
