import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import WalletHeader from "../components/Wallet/WalletHeader";
import WalletTopBar from "../components/Wallet/WalletTopBar";

function WalletScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <WalletHeader />
      </View>
      <View style={styles.topBarContainer}>
        <WalletTopBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8BB",
  },
  headerContainer: {
    marginBottom: 1,
    alignItems: "center",
  },
  topBarContainer: {
    alignItems: "center",
    flex: 0.4,
  },
  couponsContainer: {
    marginTop: 100,
    flex: 0.6,
  },
});

export default WalletScreen;
