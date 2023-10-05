import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import DataView from "../../components/DataView";
import SuccessPageWrapper from "../../components/SuccessPageWrapper";

const SignSuccess = () => {
  const { message = "", signedTx } = useLocalSearchParams();

  return (
    <SuccessPageWrapper message={message}>
      <View style={styles.dataContainer}>
        <DataView label="Signed Transaction" value={signedTx} />
      </View>
    </SuccessPageWrapper>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    gap: 20,
  },
});

export default SignSuccess;
