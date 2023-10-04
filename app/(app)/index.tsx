import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Buffer } from "buffer";
import EC from "elliptic-expo/lib/elliptic/ec";
import { keccak256 } from "js-sha3";

import commonStyles from "../../styles";
import NavButton from "../../components/NavButton";
import DataView from "../../components/DataView";
import { secureSave, getSecureValueFor } from "../../utils/secure_store";

const App = () => {
  const [wallet, setWallet] = useState<string | null>(null);

  const handleWalletCreation = async () => {
    const ec = new EC("secp256k1");
    const keyPair = ec.genKeyPair();
    const pubPoint = keyPair.getPublic();
    const pub = pubPoint.encode("hex");
    const priv = keyPair.getPrivate("hex");
    const bufferTest = Buffer.from(pub, "hex");
    const keccak = keccak256(bufferTest.toString());
    const address = `0x${keccak.slice(-40)}`;
    await secureSave("priv", priv);
    await secureSave("pub", pub);
    await secureSave("wallet", address);
    router.replace("/(wallet)/success");
  };

  useEffect(() => {
    const loadAddress = async () => {
      const _wallet = await getSecureValueFor("wallet");
      setWallet(_wallet);
    };
    loadAddress();
  }, []);

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.topContainer}>
        <DataView label="Wallet Address" value={wallet} />
      </View>

      <View style={commonStyles.buttonContainer}>
        <NavButton onClick={handleWalletCreation} text="Create Wallet" />
        <NavButton link="/(sign)/message" text="Sign Message" />
      </View>
    </View>
  );
};

export default App;
