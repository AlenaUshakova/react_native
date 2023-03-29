import {
  StyleSheet,
  View,
} from "react-native";

import * as Font from "expo-font";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { useEffect, useState } from "react";

const customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
};

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }

    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <RegistrationScreen onPress={() => setLoggedIn(!isLoggedIn)} />
      ) : (
        <LoginScreen onPress={() => setLoggedIn(!isLoggedIn)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
