import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "../../components/DetailKost/BackButton";
import { BASE_HOST } from "../../config/BaseUrl";
import http from "../../config/HttpConfig";

export default function InfoProfileScreen({ navigation, route }) {
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    email: "",
    genderTypeId: "",
    address: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const { userId } = route.params;
    fetchUserData(userId);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await http.get(`/customer/v1/${userId}`);
      if (!response.data.code === 200 || !response.data.code === 201) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.data;
      setUserData(userData);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await http.put(`/customer/v1`, {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        genderTypeId: userData.genderTypeId.id,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        username: userData.username,
        password: userData.password,
      });

      if (!response.data.code === 201 || !response.data.code === 200) {
        throw new Error("Failed to update user data");
      }

      Alert.alert("Success", "Profile updated successfully");
      console.log(userData.username);
      navigation.goBack();
    } catch (error) {
      console.log(userData.username);
      console.log(userData.genderTypeId.id);
      console.error("Error updating user data:", error);
      Alert.alert("Error", "Failed to update user data. Please try again.");
    }
  };

  const handleChange = (key, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [key]: value,
    }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.loginImage}
          source={require("../../../assets/images/infoprofil.png")}
        />
        <View style={{ position: "absolute", top: 10, left: "4%" }}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.infoProfilContainer}>
          <Text style={styles.title}>Info Profile</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.username}
              onChangeText={(text) => handleChange("username", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.id}
              onChangeText={(text) => handleChange("id", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.genderTypeId.name}
              onChangeText={(text) => handleChange("fullName", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="home" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.address}
              onChangeText={(text) => handleChange("address", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.phoneNumber}
              onChangeText={(text) => handleChange("phoneNumber", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  loginImage: {
    width: "100%",
    height: 300,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoProfilContainer: {
    minWidth: "100%",
    height: "100%",
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 50,
    marginTop: -37,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  editText: {
    fontSize: 20,
    color: "#F9A826",
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    color: "black",
  },
  loginButton: {
    backgroundColor: "#F9A826",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
