import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import nacl from "tweetnacl";

const publicKey = "dappPK";
const secretKey = "dappSK";

const storeKey = async (dappKeyPair: nacl.BoxKeyPair) => {
  try {
    await SecureStore.setItemAsync(publicKey, dappKeyPair.publicKey.toString());
    await SecureStore.setItemAsync(secretKey, dappKeyPair.secretKey.toString());
  } catch (error) {
    console.log(error);
  }
};

const getKey = async () => {
  try {
    const dappPublicKey = await SecureStore.getItemAsync(publicKey);
    const dappSecretKey = await SecureStore.getItemAsync(secretKey);
    return {
      publicKey: Uint8Array.from(dappPublicKey?.split(",").map(val => parseInt(val)) as number[]),
      secretKey: Uint8Array.from(dappSecretKey?.split(",").map(val => parseInt(val)) as number[]),
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  storeKey,
  getKey,
};
