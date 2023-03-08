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
      publicKey: Buffer.from(dappPublicKey as string),
      secretKey: Buffer.from(dappSecretKey as string),
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  storeKey,
  getKey,
};
