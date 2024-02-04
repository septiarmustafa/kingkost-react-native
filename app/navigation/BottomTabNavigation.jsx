import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const [role, setRole] = useState();

  useEffect(async () => {
    const role = await AsyncStorage.getItem("role");

    setRole(role);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY_COLOR,
      }}
    ></Tab.Navigator>
  );
}
