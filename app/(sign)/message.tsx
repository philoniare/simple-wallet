import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { ethers, parseEther, hexlify, toUtf8Bytes } from "ethers";
import { router } from "expo-router";

import commonStyles from "../../styles";
import NavButton from "../../components/NavButton";
import { getSecureValueFor } from "../../utils/secure_store";

const Message = () => {
  const [message, setMessage] = useState("");

  const handleSignMessage = useCallback(async () => {
    const priv = await getSecureValueFor("priv");
    if (priv) {
      const wallet = new ethers.Wallet(priv);
      const tx = {
        to: "0x0000000000000000000000000000000000000000",
        value: parseEther("0.1"),
        nonce: 0,
        gasPrice: "0x09184e72a000",
        gasLimit: "0x2710",
        data: hexlify(toUtf8Bytes(message)),
      };

      // Sign the transaction
      const signedTx = await wallet.signTransaction(tx);

      const signedMessage = await wallet.signMessage(message);
      router.replace({
        pathname: "/(sign)/success",
        params: {
          signedMessage,
          signedTx,
        },
      });
    }
  }, [message]);

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.buttonContainer}>
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

export default Message;
