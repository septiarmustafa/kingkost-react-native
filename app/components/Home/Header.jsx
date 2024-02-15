import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../../config/HttpConfig";
import Colors from "../../utils/Colors";
import profile from "../../../assets/images/default-profile.jpg";

export default function Header() {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await http.get(`/customer/user/${userId}`);
          if (response.status === 200) {
            setFullName(response.data.data.fullName);
          } else {
            console.error("Failed to fetch user data:", response.data.message);
          }
        } else {
          console.error("User ID not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{ color: Colors.DARK }}>Welcome,</Text>
          <Text
            style={{ color: Colors.DARK, fontSize: 20, fontWeight: "bold" }}
          >
            {fullName ? fullName : "Guest"}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.profileImage} source={profile} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    backgroundColor: Colors.TRANSPARENT,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  imageContainer: {
    borderColor: Colors.GREY,
    borderWidth: 1,
    borderRadius: 50,
  },
});
