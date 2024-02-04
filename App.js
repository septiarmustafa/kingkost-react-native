// App.js

import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { AppNavigation } from "./app/navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
