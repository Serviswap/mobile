import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

function ExploreHeader({ navigation }: { navigation: any }) {
  const [wikiCount, setWikiCount] = useState(0);

  useEffect(() => {
    async () => {
    //   const result = await marketApi.getWiki(user._id);
    //   setWikiCount(result.data.wikiCount);
    };
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/exploreClouds.png")}
        style={styles.clouds}
      />
      <Text style={styles.header}>TOWN OF BERKELEY</Text>
      <View style={styles.rightIcons}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Wallet")}>
          <View style={styles.walletButton}>
            <Image
              source={require("../assets/token2.png")}
              style={styles.token}
            />
            <Text style={styles.num}>{wikiCount}</Text>
            <Image
              source={require("../assets/wallet3.png")}
              style={styles.walletImage}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#FFFDF4",
    marginBottom: 17,
  },
  clouds: {
    position: "absolute",
    zIndex: 65000,
    marginTop: -40,
  },
  header: {
    color: "#6F6B56",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
    paddingBottom: -5,
  },
  rightIcons: {
    position: "absolute",
    right: 25,
    flexDirection: "row",
    zIndex: 65000,
  },
  walletButton: {
    width: 80,
    height: 30,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#A0C99F",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
  },
  token: {
    marginLeft: 5,
    width: "28%",
    height: "80%",
  },
  num: {
    color: "#6F6B56",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 5,
  },
  walletImage: {
    marginLeft: 5,
    width: "60%",
    height: "170%",
  },
});

export default ExploreHeader;
