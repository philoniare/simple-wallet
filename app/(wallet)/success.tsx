import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import commonStyles from "../../styles";
import { getSecureValueFor } from "../../utils/secure_store";
import NavButton from "../../components/NavButton";
import DataView from "../../components/DataView";

const Success = () => {
  const [priv, setPriv] = useState<null | string>(null);
  const [pub, setPub] = useState<null | string>(null);
  const [wallet, setWallet] = useState<null | string>(null);

  useEffect(() => {
    const securelyLoadData = async () => {
      const _priv = await getSecureValueFor("priv");
      const _pub = await getSecureValueFor("pub");
      const _wallet = await getSecureValueFor("wallet");
      setPriv(_priv);
      setPub(_pub);
      setWallet(_wallet);
    };

    securelyLoadData();
  }, []);

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.topContainer}>
        <Text style={commonStyles.title}>Wallet successfully created!</Text>
        <View style={styles.dataContainer}>
          <DataView label="Private Key" value={priv} />
          <DataView label="Public Key" value={pub} />
          <DataView label="Wallet Address" value={wallet} />
        </View>
      </View>

      <View style={commonStyles.buttonContainer}>
        <NavButton link="/" text="Home" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    gap: 20,
  },
});

export default Success;
