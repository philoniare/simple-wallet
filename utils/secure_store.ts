import * as SecureStore from "expo-secure-store";

const secureSave = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

const getSecureValueFor = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

export { secureSave, getSecureValueFor };
