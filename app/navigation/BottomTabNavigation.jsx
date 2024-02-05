import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import DetailKostScreen from "../screens/DetailKostScreen/DetailKostScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="Transaction"
        component={DetailKostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart"  size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
