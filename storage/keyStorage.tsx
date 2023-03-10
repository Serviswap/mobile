import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

const dappPKKey = "dappPK";
const dappSKKey = "dappSK";
const sharedSecretKey = "sharedSecret";
const sessionKey = "session";
const phantomWalletPKKey = "phantom";

const storeDappKeyPair = async (dappKeyPair: nacl.BoxKeyPair) => {
  try {
    await SecureStore.setItemAsync(dappPKKey, dappKeyPair.publicKey.toString());
    await SecureStore.setItemAsync(dappSKKey, dappKeyPair.secretKey.toString());
  } catch (error) {
    console.log(error);
  }
};

const getDappKeyPair = async () => {
  try {
    const pk = await SecureStore.getItemAsync(dappPKKey);
    const sk = await SecureStore.getItemAsync(dappSKKey);
    return {
      publicKey: Uint8Array.from(pk?.split(",").map(val => parseInt(val)) as number[]),
      secretKey: Uint8Array.from(sk?.split(",").map(val => parseInt(val)) as number[]),
    };
  } catch (error) {
    console.log(error);
  }
};

const storeSharedSecret = async (sharedSecret: Uint8Array) => {
  try {
    await SecureStore.setItemAsync(sharedSecretKey, sharedSecret.toString());
  } catch (error) {
    console.log(error);
  }
};

const getSharedSecret = async () => {
  try {
    const sharedSecret = await SecureStore.getItemAsync(sharedSecretKey);
    return Uint8Array.from(sharedSecret?.split(",").map(val => parseInt(val)) as number[]);
  } catch (error) {
    console.log(error);
  }
};

const storeSession = async (session: string) => {
  try {
    await SecureStore.setItemAsync(sessionKey, session);
  } catch (error) {
    console.log(error);
  }
};

const getSession = async () => {
  try {
    const session = await SecureStore.getItemAsync(sessionKey);
    return session;
  } catch (error) {
    console.log(error);
  }
};

const storePhantomWalletPublicKey = async (phantomWalletPublicKey: PublicKey) => {
  try {
    await SecureStore.setItemAsync(phantomWalletPKKey, phantomWalletPublicKey.toString());
  } catch (error) {
    console.log(error);
  }
};

const getPhantomWalletPublicKey = async () => {
  try {
    const phantomWalletPublicKey = await SecureStore.getItemAsync(phantomWalletPKKey);
    return new PublicKey(phantomWalletPublicKey as string);
  } catch (error) {
    console.log(error);
  }
};

const resetStorage = async () => {
  await SecureStore.deleteItemAsync(dappPKKey);
  await SecureStore.deleteItemAsync(dappSKKey);
  await SecureStore.deleteItemAsync(sharedSecretKey);
  await SecureStore.deleteItemAsync(sessionKey);
  await SecureStore.deleteItemAsync(phantomWalletPKKey);
}

export default {
  storeDappKeyPair,
  getDappKeyPair,
  storeSharedSecret,
  getSharedSecret,
  storeSession,
  getSession,
  storePhantomWalletPublicKey,
  getPhantomWalletPublicKey,
  resetStorage
};
