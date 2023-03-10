import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

function WalletTopBar({}) {
  const [wikiCount, setWikiCount] = useState(0);

  useEffect(() => {
    (async () => {
      // const result = await marketApi.getWiki(user._id);
      // setWikiCount(result.data.wikiCount);
    })();
  }, [useIsFocused()]);

  return (
    <View style={styles.topBarRegion}>
      <Image source = {require('../../assets/coinGroup.png')} style={styles.coinGroup} />
      <View style={styles.textBox}>
        <Text style={styles.text}>
          My $Wiki
        </Text>
        <View style={styles.tokenContainer}>
          <Image source = {require('../../assets/newToken.png')} style={styles.token} /> 
          <Text style={styles.num}>{wikiCount}</Text>
        </View>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  topBarRegion: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%"
  },
  coinGroup: {
    marginTop: 30,
    zIndex: 2,
    resizeMode: 'contain',
  },
  textBox: {
    marginTop: -10,
    width: "40%",
    height: "23%",
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: '#F2F0D9',
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  text: {
    marginLeft: 15,
    marginTop: 10,
    color: "#6F6B56",
    fontSize: 15,
    fontWeight: "bold",
  },
  tokenContainer: {
    marginLeft: 13,
    marginTop: 10,
    width: "35%",
    height: "50%",
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: '#E1DCB0',
    alignItems: "center",
    justifyContent: "flex-start",
  },
  token: {
    marginLeft: 10,
    width: "40%",
    height: "70%"
  },
  num: {
    marginLeft: 3,
    color: "#6F6B56",
    fontSize: 17,
    fontWeight: "bold", 
  },
});

export default WalletTopBar;
