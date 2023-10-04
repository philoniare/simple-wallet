import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface DataViewProps {
  label: string;
  value: string | string[] | null | undefined;
}

const DataView = ({ label, value }: DataViewProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
  },
});

export default DataView;
