import commonStyles from "../styles";
import { Text, View } from "react-native";
import DataView from "./DataView";
import React from "react";
import { Stack } from "expo-router";

interface SuccessPageWrapperProps {
  message: string | string[];
  children: React.ReactNode;
}

const SuccessPageWrapper = ({ message, children }: SuccessPageWrapperProps) => {
  return (
    <>
      <Stack.Screen options={{ title: message as string }} />
      <View style={commonStyles.container}>
        <View style={commonStyles.topContainer}>{children}</View>
      </View>
    </>
  );
};

export default SuccessPageWrapper;
