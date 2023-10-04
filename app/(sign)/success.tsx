import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import commonStyles from "../../styles";
import NavButton from "../../components/NavButton";
import DataView from "../../components/DataView";

const Success = () => {
  const params = useLocalSearchParams();
  const { signedMessage, signedTx } = params;
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.topContainer}>
        <Text style={commonStyles.title}>Message Signed Successfully!</Text>
        <View style={styles.dataContainer}>
          <DataView label="Signed Message" value={signedMessage} />
          <DataView label="Signed Eth Transaction" value={signedTx} />
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
