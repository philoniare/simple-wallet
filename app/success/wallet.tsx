import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { getSecureValueFor } from "../../utils/secure_store";
import DataView from "../../components/DataView";
import { useWallet } from "../../context/wallets";
import SuccessPageWrapper from "../../components/SuccessPageWrapper";

const WalletSuccess = () => {
  const { wallets } = useWallet();
  const { message = "" } = useLocalSearchParams();
  const [privateKey, setPrivateKey] = useState("");
  const [createdWallet, setCreatedWallet] = useState(null);

  useEffect(() => {
    const getPrivateKey = async (address: string) => {
      const priv = await getSecureValueFor(address);
      setPrivateKey(priv);
    };

    if (wallets) {
      const lastWallet = wallets[wallets.length - 1];
      setCreatedWallet(lastWallet);
      getPrivateKey(lastWallet.address);
    }
  }, [wallets]);

  return (
    <SuccessPageWrapper message={message}>
      <View style={styles.dataContainer}>
        <DataView label="Private Key" value={privateKey} />
        <DataView label="Public Key" value={createdWallet?.pubKey} />
        <DataView label="Wallet Address" value={createdWallet?.address} />
      </View>
    </SuccessPageWrapper>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    gap: 20,
  },
});

export default WalletSuccess;
