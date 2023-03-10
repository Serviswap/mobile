import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import AccountContext from "../account/AccountContext";
import keyStorage from "../storage/keyStorage";
import WalletConnect from "./WalletConnect";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // store dappKeyPair, sharedSecret, session and account SECURELY on device
  // to avoid having to reconnect users.
  const [address, setAddress] = useState<string>("");
  const [dappKeyPair, setDappKeyPair] = useState<nacl.BoxKeyPair | undefined>(
    nacl.box.keyPair()
  );
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string>();
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] =
    useState<PublicKey>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    keyStorage.storeDappKeyPair(dappKeyPair!);
  }, []);

  return (
    <AccountContext.Provider
      value={{
        address,
        session,
        sharedSecret,
        dappKeyPair,
        phantomWalletPublicKey,
        isConnected,
        setAddress,
        setSession,
        setSharedSecret,
        setDappKeyPair,
        setPhantomWalletPublicKey,
        setIsConnected,
      }}
    >
      {loaded ? (
        isConnected ? (
          <RootLayoutNav />
        ) : (
          <WalletConnect />
        )
      ) : (
        <SplashScreen />
      )}
    </AccountContext.Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="Explore" options={{ headerShown: false }} />
          <Stack.Screen name="Wallet" options={{ headerShown: false }} />
          <Stack.Screen name="PostDetail" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
