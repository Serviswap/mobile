import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import bs58 from "bs58";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as Linking from "expo-linking";
import nacl from "tweetnacl";
import useAccount from "../account/useAccount";
import dappKeyPairStorage from "../auth/dappKeyPairStorage";

const onConnectRedirectLink = Linking.createURL("onConnect");
const onDisconnectRedirectLink = Linking.createURL("onDisconnect");
const onSignAndSendTransactionRedirectLink = Linking.createURL(
  "onSignAndSendTransaction"
);
const onSignAllTransactionsRedirectLink = Linking.createURL(
  "onSignAllTransactions"
);
const onSignTransactionRedirectLink = Linking.createURL("onSignTransaction");
const onSignMessageRedirectLink = Linking.createURL("onSignMessage");

const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`;

const encryptPayload = (payload: any, sharedSecret?: Uint8Array) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const nonce = nacl.randomBytes(24);

  const encryptedPayload = nacl.box.after(
    Buffer.from(JSON.stringify(payload)),
    nonce,
    sharedSecret
  );

  return [nonce, encryptedPayload];
};

const NETWORK = clusterApiUrl("mainnet-beta");
const connection = new Connection(NETWORK);

const createTransferTransaction = async (phantomWalletPublicKey: PublicKey) => {
  if (!phantomWalletPublicKey) throw new Error("missing public key from user");
  let transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: phantomWalletPublicKey,
      toPubkey: phantomWalletPublicKey,
      lamports: 100,
    })
  );
  transaction.feePayer = phantomWalletPublicKey;
  console.log("Getting recent blockhash");
  const anyTransaction: any = transaction;
  anyTransaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;
  return transaction;
};

const connect = async () => {
  try {
    const dappKeyPair = await dappKeyPairStorage.getKey();
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair!.publicKey),
      cluster: "mainnet-beta",
      app_url: "https://phantom.app",
      redirect_link: onConnectRedirectLink,
    });

    const url = buildUrl("connect", params);
    console.log(url);
    Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

const disconnect = async (session: string, sharedSecret: Uint8Array) => {
  try {
    const dappKeyPair = await dappKeyPairStorage.getKey();
    const payload = {
      session,
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair!.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onDisconnectRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });

    const url = buildUrl("disconnect", params);
    Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

const signAndSendTransaction = async (
  phantomWalletPublicKey: PublicKey,
  session: string,
  sharedSecret: Uint8Array
) => {
  try {
    const dappKeyPair = await dappKeyPairStorage.getKey();
    const transaction = await createTransferTransaction(phantomWalletPublicKey);

    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
    });

    const payload = {
      session,
      transaction: bs58.encode(serializedTransaction),
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair!.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignAndSendTransactionRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });

    console.log("Sending transaction...");
    const url = buildUrl("signAndSendTransaction", params);
    Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

const signAllTransactions = async (
  phantomWalletPublicKey: PublicKey,
  session: string,
  sharedSecret: Uint8Array
) => {
  try {
    const dappKeyPair = await dappKeyPairStorage.getKey();
    const transactions = await Promise.all([
      createTransferTransaction(phantomWalletPublicKey),
      createTransferTransaction(phantomWalletPublicKey),
    ]);

    const serializedTransactions = transactions.map((t) =>
      bs58.encode(
        t.serialize({
          requireAllSignatures: false,
        })
      )
    );

    const payload = {
      session,
      transactions: serializedTransactions,
    };

    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair!.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignAllTransactionsRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });

    console.log("Signing transactions...");
    const url = buildUrl("signAllTransactions", params);
    Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

const signTransaction = async (
  phantomWalletPublicKey: PublicKey,
  session: string,
  sharedSecret: Uint8Array
) => {
  try {
    const dappKeyPair = await dappKeyPairStorage.getKey();
    const transaction = await createTransferTransaction(phantomWalletPublicKey);

    const serializedTransaction = bs58.encode(
      transaction.serialize({
        requireAllSignatures: false,
      })
    );

    const payload = {
      session,
      transaction: serializedTransaction,
    };

    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair!.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignTransactionRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });

    console.log("Signing transaction...");
    const url = buildUrl("signTransaction", params);
    Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

const signMessage = async (session: string, sharedSecret: Uint8Array) => {
  try {
    const dappKeyPair = await dappKeyPairStorage.getKey();
    const message =
      "To avoid digital dognappers, sign below to authenticate with CryptoCorgis.";

    const payload = {
      session,
      message: bs58.encode(Buffer.from(message)),
    };

    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair!.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignMessageRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });

    console.log("Signing message...");
    const url = buildUrl("signMessage", params);
    Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

export default {
  connect,
  disconnect,
  signAllTransactions,
  signAndSendTransaction,
  signMessage,
  signTransaction,
};
