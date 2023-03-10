import { StyleSheet } from "react-native";
import useAccount from "../account/useAccount";
import AppButton from "../components/AppButton";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import walletApi from "../api/wallet";
import { PublicKey } from "@solana/web3.js";
import ExploreHeader from "../components/Explore/ExploreHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import PostEditButton from "../components/Explore/PostEditButton";
import { useNavigation } from "expo-router";

export default function ExploreScreen() {
  const { phantomWalletPublicKey, session, sharedSecret, logout } =
    useAccount();
  const {
    signAndSendTransaction,
    signAllTransactions,
    signTransaction,
    signMessage,
  } = walletApi;

  const navigation = useNavigation() as any;

  return (
    <SafeAreaView style={styles.container}>
      <ExploreHeader navigation={navigation} />
      <View
        style={{
          flex: 0,
          paddingTop: 20,
          paddingBottom: 40,
          backgroundColor: "#FFFDF4",
        }}
      >
        <AppButton
          name="Disconnect"
          onPress={logout}
          style={{}}
          textStyle={{}}
        />
        <AppButton
          name="Sign And Send Transaction"
          onPress={() =>
            signAndSendTransaction(
              phantomWalletPublicKey as PublicKey,
              session as string,
              sharedSecret as Uint8Array
            )
          }
          style={{}}
          textStyle={{}}
        />
        <AppButton
          name="Sign All Transactions"
          onPress={() =>
            signAllTransactions(
              phantomWalletPublicKey as PublicKey,
              session as string,
              sharedSecret as Uint8Array
            )
          }
          style={{}}
          textStyle={{}}
        />
        <AppButton
          name="Sign Transaction"
          onPress={() =>
            signTransaction(
              phantomWalletPublicKey as PublicKey,
              session as string,
              sharedSecret as Uint8Array
            )
          }
          style={{}}
          textStyle={{}}
        />
        <AppButton
          name="Sign Message"
          onPress={() =>
            signMessage(session as string, sharedSecret as Uint8Array)
          }
          style={{}}
          textStyle={{}}
        />
      </View>
      <PostEditButton onPress={() => navigation.navigate("PostDetail")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFDF4",
  },
});
