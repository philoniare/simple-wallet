import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

import commonStyles from "../styles";
import NavButton from "../components/NavButton";
import { useWallet } from "../context/wallets";
import { signTransaction } from "../utils/crypto";

const Sign = () => {
  const [message, setMessage] = useState("");
  const [selectedWalletAddress, setSelectedWalletAddress] = useState("");
  const { wallets } = useWallet();

  const handleSignMessage = useCallback(async () => {
    const signedTx = await signTransaction(selectedWalletAddress, message);
    router.replace({
      pathname: "/success/sign",
      params: {
        message: "Successfully signed transaction!",
        signedTx,
      },
    });
  }, [message]);

  useEffect(() => {
    if (wallets.length > 0) {
      setSelectedWalletAddress(wallets[0].address);
    }
  }, [wallets]);

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.buttonContainer}>
        <Text>Select Wallet:</Text>
        <Picker
          selectedValue={selectedWalletAddress}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedWalletAddress(itemValue);
          }}
        >
          {wallets.map((wallet, index) => (
            <Picker.Item
              key={index}
              label={wallet.alias}
              value={wallet.address}
            />
          ))}
        </Picker>
        <Text>Enter Message:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
        />
        <NavButton onClick={handleSignMessage} text="Sign" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    height: 80,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default Sign;
