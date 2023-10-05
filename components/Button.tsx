import React from "react";
import { Pressable, Text, View } from "react-native";

export function Button({
  children,
  onPress,
  style,
  buttonStyle,
  textStyle,
}: {
  children: string;
  onPress: () => void;
  style?: any;
  buttonStyle?: any;
  textStyle?: any;
}) {
  return (
    <Pressable onPress={onPress} style={style}>
      {({ pressed }) => (
        <View
          style={[
            {
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 8,
              justifyContent: "center",
              alignItems: "center",
            },
            buttonStyle,
            pressed && { opacity: 0.6 },
          ]}
        >
          <Text
            selectable={false}
            style={[
              { color: "white", fontSize: 16, textAlign: "center" },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
