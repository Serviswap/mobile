import { StyleSheet } from "react-native";
import useAccount from "../../account/useAccount";
import Btn from "../../components/Btn";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import walletApi from "../../api/wallet";
import { PublicKey } from "@solana/web3.js";

export default function TabOneScreen() {
  const { phantomWalletPublicKey, session, sharedSecret } = useAccount();
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
        <Btn
          title="Disconnect"
          onPress={() =>
            disconnect(session as string, sharedSecret as Uint8Array)
          }
        />
        <Btn
          title="Sign And Send Transaction"
          onPress={() =>
            signAndSendTransaction(
              phantomWalletPublicKey as PublicKey,
              session as string,
              sharedSecret as Uint8Array
            )
          }
        />
        <Btn
          title="Sign All Transactions"
          onPress={() =>
            signAllTransactions(
              phantomWalletPublicKey as PublicKey,
              session as string,
              sharedSecret as Uint8Array
            )
          }
        />
        <Btn
          title="Sign Transaction"
          onPress={() =>
            signTransaction(
              phantomWalletPublicKey as PublicKey,
              session as string,
              sharedSecret as Uint8Array
            )
          }
        />
        <Btn
          title="Sign Message"
          onPress={() =>
            signMessage(session as string, sharedSecret as Uint8Array)
          }
        />
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
