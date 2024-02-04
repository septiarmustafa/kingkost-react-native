import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_HOST } from "../../config/BaseUrl";
import Colors from "../../utils/Colors";

export default function RegisterScreen() {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    name: "",
    address: "",
    mobilePhone: "",
    email: "",
  });
  const navigation = useNavigation();

  const handleFieldChange = (field, text) => {
    setRegistrationData({
      ...registrationData,
      [field]: text,
    });
  };

  const handleRegister = async () => {
    const { username, password, name, address, mobilePhone, email } =
      registrationData;
    if (!username || !password || !name || !address || !mobilePhone || !email) {
      Alert.alert(
        "Error",
        !username
          ? "Username is required."
          : !password
          ? "Password is required."
          : !name
          ? "Name is required."
          : !address
          ? "Address is required."
          : !mobilePhone
          ? "Mobile Phone is required."
          : !email
          ? "Email is required."
          : "All field are required."
      );
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_HOST}/api/auth/customer/register`,
        registrationData
      );
      console.log(response);
      if (response.status === 201) {
        console.log("Registration successful!");
        navigation.navigate("Login");
      } else {
        console.error("Registration failed");
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={Colors.WHITE}
          value={registrationData.username}
          onChangeText={(text) => handleFieldChange("username", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.WHITE}
          secureTextEntry
          value={registrationData.password}
          onChangeText={(text) => handleFieldChange("password", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={Colors.WHITE}
          value={registrationData.name}
          onChangeText={(text) => handleFieldChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor={Colors.WHITE}
          value={registrationData.address}
          onChangeText={(text) => handleFieldChange("address", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Phone"
          placeholderTextColor={Colors.WHITE}
          value={registrationData.mobilePhone}
          onChangeText={(text) => handleFieldChange("mobilePhone", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.WHITE}
          value={registrationData.email}
          onChangeText={(text) => handleFieldChange("email", text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.register}>
          <Text style={styles.signUpText}>Have an account?</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signUpButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    padding: 20,
    backgroundColor: "rgba(100, 100, 100, 0.25)",
    borderRadius: 10,
    margin: 40,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "white",
  },
  loginButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: "#dd4b39",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  appleButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  toggleButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  toggleText: {
    color: "white",
  },
  register: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "white",
    textAlign: "center",
    paddingRight: 5,
  },
  signUpButton: {
    borderRadius: 5,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
