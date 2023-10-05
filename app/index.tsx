import React, { useMemo } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useWallet } from "../context/wallets";

const App = () => {
  const { wallets } = useWallet();

  if (!wallets) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <WalletList />;
};

function useQueriedWallets() {
  const { wallets } = useWallet();
  const { q } = useLocalSearchParams();

  return useMemo(
    () =>
      wallets.filter((wallet) => {
        if (!q) {
          return true;
        }
        let query = q;
        if (Array.isArray(query)) {
          query = query[0];
        }
        const walletAlias = wallet.alias || "";
        return walletAlias.toLowerCase().includes(query.toLowerCase());
      }),
    [q, wallets],
  );
}

function WalletList() {
  const wallets = useQueriedWallets();
  const { width } = useWindowDimensions();
  const innerWindow = width - 48;
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        {
          maxWidth: 960,
          paddingVertical: 20,
          paddingHorizontal: Math.max(20, insets.left + insets.right),
          flexDirection: "row",
          flexWrap: "wrap",
          marginHorizontal: "auto",
        },
        {},
      ]}
    >
      {!wallets.length && <ListEmptyComponent />}
      {wallets.map((wallet) => (
        <Link
          style={{
            minWidth: Math.min(300, innerWindow),
            padding: 4,
            flex: 1,
            flexBasis: Math.min(300, innerWindow),
          }}
          key={wallet.address}
          href={{
            pathname: "/wallet/[address]",
            params: {
              address: wallet.address,
            },
          }}
          asChild
        >
          <Pressable>
            {({ pressed }) => (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  overflow: "hidden",
                  flex: 1,
                }}
              >
                <View
                  style={[
                    {
                      flex: 1,
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                    pressed && { backgroundColor: "rgba(0,0,0,0.2)" },
                  ]}
                >
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {wallet.alias || "Unnamed Wallet"}
                    </Text>
                    <Text style={{ fontSize: 12 }}>{wallet.address}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome
                      name="chevron-right"
                      size={16}
                      color="#919497"
                    />
                  </View>
                </View>
              </View>
            )}
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

function ListEmptyComponent() {
  const { q } = useLocalSearchParams();

  const message = React.useMemo(() => {
    return q != null
      ? "No wallet found: " + q
      : "Create a wallet to sign a message";
  }, [q]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16, textAlign: "center" }}>{message}</Text>
    </View>
  );
}

export default App;
