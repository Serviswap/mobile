import { PublicKey } from "@solana/web3.js";
import { createContext } from "react";
import nacl from "tweetnacl";

interface Account {
  address: string;
  session: string | undefined;
  sharedSecret: Uint8Array | undefined;
  dappKeyPair: nacl.BoxKeyPair | undefined;
  phantomWalletPublicKey: PublicKey | undefined;
  isConnected: boolean;
  setAddress: (address: string) => void;
  setSession: (session: string) => void;
  setSharedSecret: (sharedSecret: Uint8Array | undefined) => void;
  setDappKeyPair: (dappKeyPair: nacl.BoxKeyPair | undefined) => void;
  setPhantomWalletPublicKey: (phantomWalletPublicKey: PublicKey | undefined) => void;
  setIsConnected: (isConnected: boolean) => void;
}

const initialState: Account = {
  address: "",
  session: "",
  sharedSecret: undefined,
  dappKeyPair: undefined,
  phantomWalletPublicKey: undefined,
  isConnected: false,
  setAddress: (address: string) => {
    address = address;
  },
  setSession: (session: string) => {
    session = session;
  },
  setSharedSecret: (sharedSecret: Uint8Array | undefined) => {
    sharedSecret = sharedSecret;
  },
  setDappKeyPair: (dappKeyPair: nacl.BoxKeyPair | undefined) => {
    dappKeyPair = dappKeyPair;
  },
  setPhantomWalletPublicKey: (
    phantomWalletPublicKey: PublicKey | undefined
  ) => {
    phantomWalletPublicKey = phantomWalletPublicKey;
  },
  setIsConnected: (isConnected: boolean) => {
    console.log("bruh")
    isConnected = isConnected;
  },
};

const AccountContext = createContext(initialState);

export default AccountContext;
