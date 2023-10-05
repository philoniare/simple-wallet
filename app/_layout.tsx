import { router, Slot } from "expo-router";
import { Link, Stack, useRouter } from "expo-router";
import { Platform, Pressable, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useWallet, WalletProvider } from "../context/wallets";
import { createWallet } from "../utils/crypto";

const RootLayout = () => {
  const router = useRouter();
  return (
    <WalletProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerLeft: CreateWalletButton,
            headerRight: SignButton,
            title: "Wallets",
            headerLargeTitle: true,
            headerSearchBarOptions: {
              onChangeText: (event) => {
                router.setParams({
                  q: event.nativeEvent.text,
                });
              },
            },
          }}
        />
        <Stack.Screen
          name="sign"
          options={{
            title: "Sign a message",
            presentation: "modal",
            headerRight: Platform.select({
              ios: DismissSignButton,
            }),
          }}
        />
        <Stack.Screen
          name="success"
          options={{
            title: "Success!",
            presentation: "modal",
            headerRight: Platform.select({
              ios: DismissSignButton,
            }),
          }}
        />
      </Stack>
    </WalletProvider>
  );
};

function CreateWalletButton() {
  const { addWallet, wallets } = useWallet();
  const handleWalletCreation = async () => {
    const wallet = await createWallet(wallets.length);
    addWallet(wallet);
    router.push({
      pathname: "/success/wallet",
      params: {
        message: "Wallet successfully created!",
      },
    });
  };

  return (
    <Pressable
      onPress={handleWalletCreation}
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
    >
      <Text
        style={{
          fontWeight: "normal",
          paddingHorizontal: 8,
          fontSize: 16,
        }}
      >
        Create Wallet
      </Text>
    </Pressable>
  );
}

function SignButton() {
  return (
    <Link href="/sign" asChild>
      <Pressable
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingRight: 8,
        }}
      >
        <Text
          style={{
            fontWeight: "normal",
            paddingHorizontal: 8,
            fontSize: 16,
          }}
        >
          Sign
        </Text>
        <FontAwesome name="pencil" size={24} color="black" />
      </Pressable>
    </Link>
  );
}

function DismissSignButton() {
  return (
    <Link href="..">
      <Text
        style={{
          fontWeight: "normal",
          paddingHorizontal: 8,
          fontSize: 16,
        }}
      >
        Back
      </Text>
    </Link>
  );
}

export default RootLayout;
