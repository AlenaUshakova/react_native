import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { Home } from "./Screens/Home";

const customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
};

function checkIsLoggedIn() {
  return true;
}

export default function App() {
  const isLoggedIn = checkIsLoggedIn();
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

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
