import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_HOST } from "../../config/BaseUrl";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";

export default function LoginScreen() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [err, setErr] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
  });
  const navigation = useNavigation();

  const handleUsername = (text) => {
    setusername(text);
    setErrorMessages({ ...errorMessages, username: "" });
  };
  const handlePassword = (text) => {
    setPassword(text);
    setErrorMessages({ ...errorMessages, password: "" });
  };
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleLogin = async () => {
    if (!username) {
      setErrorMessages({ ...errorMessages, username: "Username is required." });
      return;
    }
    if (!password) {
      setErrorMessages({ ...errorMessages, password: "Password is required." });
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
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.loginImage}
          source={require("../../../assets/images/login.png")}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="user"
              size={24}
              color="grey"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={handleUsername}
              placeholderTextColor="grey"
            />
          </View>
          {errorMessages.username ? (
            <Text style={styles.errorMessage}>{errorMessages.username}</Text>
          ) : null}

          <View style={styles.passwordInputContainer}>
            <FontAwesome
              name="lock"
              size={24}
              color="grey"
              style={styles.icon}
            />
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={hidePassword}
              value={password}
              onChangeText={handlePassword}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={togglePasswordVisibility}
            >
              {hidePassword ? (
                <Entypo name="eye-with-line" size={24} color="grey" />
              ) : (
                <Entypo name="eye" size={24} color="grey" />
              )}
            </TouchableOpacity>
          </View>
          {errorMessages.password ? (
            <Text style={styles.errorMessage}>{errorMessages.password}</Text>
          ) : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
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

          <View style={styles.socialLogos}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="facebook" size={40} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="google" size={40} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => navigation.navigate("BottomTabNavigation")}
            >
              <AntDesign name="apple1" size={40} color="grey" />
            </TouchableOpacity>
          </View>
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
    height: 450,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  loginContainer: {
    minWidth: "100%",
    height: "100%",
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 50,
    marginTop: -65,
  },
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "white",
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "black",
    width: "98%",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginTop: -9,
    marginBottom: 5,
    paddingLeft: 5,
  },
  loginButton: {
    backgroundColor: "#F9A826",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
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
    color: "grey",
    textAlign: "center",
    paddingRight: 5,
  },
  signUpButton: {
    borderRadius: 5,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "grey",
    fontWeight: "bold",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "black",
  },
  socialLogos: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  socialButton: {
    marginHorizontal: 10,
  },
});
