import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { useWallet } from "../../context/wallets";
import { Button } from "../../components/Button";

export default function Wallet() {
  const { address } = useLocalSearchParams();
  const { wallets, deleteWallet } = useWallet();
  const router = useRouter();

  const selected = wallets?.find((wallet) => wallet.address === address);

  if (!selected) {
    return (
      <>
        <Stack.Screen options={{ title: "Wallet Not Found!" }} />
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={{ fontSize: 24 }}>
              Cannot find wallet for address: {address}
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: selected.alias || "" }} />
      <View style={styles.container}>
        <View style={styles.main}>
          <Item title="Address">{selected.address}</Item>
          <Item title="Public Address">{selected.pubKey}</Item>

          <Button
            style={{ marginTop: 16 }}
            onPress={() => {
              deleteWallet(selected.address);
              router.back();
            }}
            buttonStyle={{ backgroundColor: "crimson" }}
          >
            Remove Wallet
          </Button>
        </View>
      </View>
    </>
  );
}

function Item({ title, children }) {
  return (
    <View style={{ paddingVertical: 12 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={{ fontSize: 16 }}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});
