import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigation from "./BottomTabNavigation";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import DetailKostScreen from "../screens/DetailKostScreen/DetailKostScreen";

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const [signedIn, setSignedIn] = React.useState(false);

  const getIsSignedIn = async () => {
    let isSignedIn = await AsyncStorage.getItem("token");
    setSignedIn(isSignedIn ? true : false);
  };

  React.useEffect(() => {
    getIsSignedIn();
  }, []);

  return (
    <Stack.Navigator>
      {signedIn ? (
        <>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailKostScreen"
            component={DetailKostScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
