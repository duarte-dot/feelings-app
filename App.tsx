import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Home } from "./src/screens/Home";

export default function App() {
  return (
    <>
      <StatusBar
        style="dark"
        backgroundColor="transparent"
        translucent={true}
      />

      <Home />
    </>
  );
}
