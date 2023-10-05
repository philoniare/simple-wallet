import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type Wallet = {
  address: string;
  pubKey: string;
  alias: string;
};

type WalletContext = {
  wallets: Wallet[];
  addWallet: (props: {
    address: string;
    pubKey: string;
    alias: string;
  }) => void;
  deleteWallet: (address: string) => void;
};

const WalletsContext = createContext<WalletContext | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>(null);
  const { getItem, setItem } = useAsyncStorage("WALLETS");

  // Load wallets from storage
  useEffect(() => {
    let isMounted = true;
    getItem().then((json) => {
      if (!isMounted) return;

      if (json != null) {
        const loadedWallets = JSON.parse(json);
        setWallets(loadedWallets ?? []);
      } else {
        setWallets([]);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Persist wallets to storage
  useEffect(() => {
    if (!wallets) return;
    setItem(JSON.stringify(wallets));
  }, [wallets]);

  const addWallet = (props: {
    address: string;
    pubKey: string;
    alias: string;
  }) => {
    const wallet: Wallet = {
      address: props.address,
      pubKey: props.pubKey,
      alias: props.alias,
    };
    setWallets((wallets) => [...wallets, wallet]);
  };

  const deleteWallet = (address: string) => {
    setWallets((wallets) =>
      wallets.filter((wallet) => wallet.address !== address),
    );
  };

  return (
    <WalletsContext.Provider value={{ wallets, addWallet, deleteWallet }}>
      {children}
    </WalletsContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletsContext);
  if (!context) {
    throw new Error("useWallets must be used within a WalletProvider");
  }
  return context;
};
