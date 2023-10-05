// styles.js
import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
    justifyContent: "flex-start",
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 36,
    paddingHorizontal: 50,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default commonStyles;
