import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { PublicKey, Transaction } from "@solana/web3.js";
import useAccount from "../account/useAccount";
import walletApi from "../api/wallet";
import keyStorage from "../storage/keyStorage";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

const decryptPayload = (
  data: string,
  nonce: string,
  sharedSecret?: Uint8Array
) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const decryptedData = nacl.box.open.after(
    bs58.decode(data),
    bs58.decode(nonce),
    sharedSecret
  );
  if (!decryptedData) {
    throw new Error("Unable to decrypt data");
  }
  return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
};

export default function WalletConnect() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const { login, logout, sharedSecret, dappKeyPair } = useAccount();
  const { connect } = walletApi;
  const [deepLink, setDeepLink] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  // store dappKeyPair, sharedSecret, session and account SECURELY on device
  // to avoid having to reconnect users.

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
      const phantomWalletPublicKey =
        await keyStorage.getPhantomWalletPublicKey();
      const session = await keyStorage.getSession();
      const sharedSecret = await keyStorage.getSharedSecret();
      if (phantomWalletPublicKey && session && sharedSecret) {
        login(sharedSecret, session, phantomWalletPublicKey);
      }
    })();
    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);

  const handleDeepLink = ({ url }: Linking.EventType) => {
    setDeepLink(url);
  };

  // handle inbounds links
  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;

    if (params.get("errorCode")) {
      console.log(JSON.stringify(Object.fromEntries([...params]), null, 2));
      return;
    }

    if (/onConnect/.test(url.pathname)) {
      if (!dappKeyPair) {
        console.log("Key pair not generated");
        return;
      }
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair!.secretKey
      );

      const connectData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecretDapp
      );

      login(
        sharedSecretDapp,
        connectData.session,
        new PublicKey(connectData.public_key)
      );
      console.log("onConnect: ", JSON.stringify(connectData, null, 2));
    } else if (/onDisconnect/.test(url.pathname)) {
      logout();
      console.log("Disconnected!");
    } else if (/onSignAndSendTransaction/.test(url.pathname)) {
      const signAndSendTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      console.log(
        "onSignAndSendTransaction: ",
        JSON.stringify(signAndSendTransactionData, null, 2)
      );
    } else if (/onSignAllTransactions/.test(url.pathname)) {
      const signAllTransactionsData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      const decodedTransactions = signAllTransactionsData.transactions.map(
        (t: string) => Transaction.from(bs58.decode(t))
      );

      console.log(
        "onSignAllTransactions: ",
        JSON.stringify(decodedTransactions, null, 2)
      );
    } else if (/onSignTransaction/.test(url.pathname)) {
      const signTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      const decodedTransaction = Transaction.from(
        bs58.decode(signTransactionData.transaction)
      );

      console.log(
        "onSignTransaction: ",
        JSON.stringify(decodedTransaction, null, 2)
      );
    } else if (/onSignMessage/.test(url.pathname)) {
      const signMessageData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      console.log("onSignMessage: ", JSON.stringify(signMessageData, null, 2));
    }
  }, [deepLink]);

  return (
    <View style={{ flex: 1, backgroundColor: "#333" }}>
      <StatusBar style="light" />
      <View style={{ flex: 0, paddingTop: 20, paddingBottom: 40 }}>
        <View style={{ flex: 0, paddingTop: 20, paddingBottom: 40 }} />
        <Button title="Connect" onPress={connect} />
      </View>
    </View>
  );
}
