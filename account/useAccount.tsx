import { PublicKey } from "@solana/web3.js";
import { useContext } from "react";
import AccountContext from "./AccountContext";

const useAccount = () => {
  const {
    address,
    session,
    sharedSecret,
    phantomWalletPublicKey,
    isConnected,
    setAddress,
    setSession,
    setSharedSecret,
    setPhantomWalletPublicKey,
    setIsConnected,
  } = useContext(AccountContext);

  const login = (
    sharedSecretDapp: Uint8Array,
    session: string,
    publicKey: PublicKey
  ) => {
    setSharedSecret(sharedSecretDapp);
    setSession(session);
    setPhantomWalletPublicKey(publicKey);
    setIsConnected(true);
    console.log(session, sharedSecret, phantomWalletPublicKey, isConnected);
  };

  const logout = () => {
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
    phantomWalletPublicKey,
    isConnected,
    logout,
    login,
  };
};

export default useAccount;
