import { PublicKey } from "@solana/web3.js";
import { useContext } from "react";
import AccountContext from "./AccountContext";
import keyStorage from "../storage/keyStorage";

const useAccount = () => {
  const {
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
  } = useContext(AccountContext);

  const login = (
    sharedSecretDapp: Uint8Array,
    session: string,
    publicKey: PublicKey
  ) => {
    keyStorage.storeSharedSecret(sharedSecretDapp);
    keyStorage.storeSession(session);
    keyStorage.storePhantomWalletPublicKey(publicKey);
    setSharedSecret(sharedSecretDapp);
    setSession(session);
    setPhantomWalletPublicKey(publicKey);
    setIsConnected(true);
  };

  const logout = () => {
    keyStorage.resetStorage()
    setAddress("");
    setSession("");
    setSharedSecret(undefined);
    setPhantomWalletPublicKey(undefined);
    setIsConnected(false);
  };

  return {
    address,
    session,
    sharedSecret,
    dappKeyPair,
    phantomWalletPublicKey,
    isConnected,
    setDappKeyPair,
    logout,
    login,
  };
};

export default useAccount;
