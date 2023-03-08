import { StyleSheet } from "react-native";
import useAccount from "../../account/useAccount";
import Btn from "../../components/Btn";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import walletApi from "../../api/wallet";

export default function TabOneScreen() {
  console.log(useAccount());
  const {
    disconnect,
    signAndSendTransaction,
    signAllTransactions,
    signTransaction,
    signMessage,
  } = walletApi;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <View style={{ flex: 0, paddingTop: 20, paddingBottom: 40 }}>
        <Btn title="Disconnect" onPress={disconnect} />
        <Btn
          title="Sign And Send Transaction"
          onPress={signAndSendTransaction}
        />
        <Btn title="Sign All Transactions" onPress={signAllTransactions} />
        <Btn title="Sign Transaction" onPress={signTransaction} />
        <Btn title="Sign Message" onPress={signMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
