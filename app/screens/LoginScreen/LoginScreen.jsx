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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_HOST } from "../../config/BaseUrl";

export default function LoginScreen() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [err, setErr] = useState("");
  const navigation = useNavigation();

  const handleUsername = (text) => {
    setusername(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    if (!username) {
      Alert.alert("Error", "Username is required.");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Password is required.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_HOST}/api/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.data.token);
        await AsyncStorage.setItem("role", response.data.data.role);
        await AsyncStorage.setItem("username", response.data.data.username);

        console.log("Token and role saved to AsyncStorage");
        console.log(response.data.data.token);
        console.log(response.data.data.role);

        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Tab");
            },
          },
        ]);
      } else {
        Alert.alert("Error", response.data.message);
        setErr(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleUsername}
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={hidePassword ? true : false}
          value={password}
          onChangeText={handlePassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.appleButton}
          onPress={() => navigation.navigate("BottomTabNavigation")}
        >
          <Text style={styles.buttonText}>Login with Apple</Text>
        </TouchableOpacity>
        <View style={styles.register}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
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
    paddingTop: 15,
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
