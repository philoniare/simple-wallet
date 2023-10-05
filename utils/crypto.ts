import EC from "elliptic-expo/lib/elliptic/ec";
import { Buffer } from "buffer";
import { keccak256 } from "js-sha3";
import { secureSave, getSecureValueFor } from "./secure_store";
import { ethers, hexlify, parseEther, toUtf8Bytes } from "ethers/lib.esm";

export const createWallet = async (lastIndex: number) => {
  const ec = new EC("secp256k1");
  const keyPair = ec.genKeyPair();
  const pubPoint = keyPair.getPublic();
  const pubKey = pubPoint.encode("hex");
  const privateKey = keyPair.getPrivate("hex");
  const bufferTest = Buffer.from(pubKey, "hex");
  const keccak = keccak256(bufferTest.toString());
  const address = `0x${keccak.slice(-40)}`;

  // Securely store private key
  await secureSave(address, privateKey);
  return { address, pubKey, alias: `Wallet ${lastIndex + 1}` };
};

export const signTransaction = async (address: string, message: string) => {
  const privateKey = await getSecureValueFor(address);
  if (privateKey) {
    const wallet = new ethers.Wallet(privateKey);
    const tx = {
      to: "0x0000000000000000000000000000000000000000",
      value: parseEther("0.1"),
      nonce: 0,
      gasPrice: "0x09184e72a000",
      gasLimit: "0x2710",
      data: hexlify(toUtf8Bytes(message)),
    };

    // Sign the transaction
    return await wallet.signTransaction(tx);
  }
};
