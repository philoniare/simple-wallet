import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface NavButtonProps {
  link?: string;
  text: string;
  onClick?: () => {};
}

const NavButton = ({ link, text, onClick }: NavButtonProps) => {
  return link ? (
    <Link style={styles.button} href={link} asChild>
      <Pressable>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Link>
  ) : (
    <Pressable style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
  },
});

export default NavButton;
