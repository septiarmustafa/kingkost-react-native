import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_HOST } from "../../config/BaseUrl";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function RegisterScreen() {
  const [hidePassword, setHidePassword] = useState(true);
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    name: "",
    address: "",
    mobilePhone: "",
    email: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
    name: "",
    address: "",
    mobilePhone: "",
    email: "",
    gender: "",
  });
  const navigation = useNavigation();

  const handleFieldChange = (field, text) => {
    setRegistrationData({
      ...registrationData,
      [field]: text,
    });
  };
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleRegister = async () => {
    const { username, password, name, address, mobilePhone, email, gender } =
      registrationData;

    const errors = {};
    if (!username) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required.";
    if (!name) errors.name = "Name is required.";
    if (!address) errors.address = "Address is required.";
    if (!mobilePhone) errors.mobilePhone = "Mobile Phone is required.";
    if (!email) errors.email = "Email is required.";
    if (!gender) errors.gender = "Gender is required.";

    setErrorMessages(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_HOST}/api/auth/customer/register`,
        registrationData
      );

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

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.loginImage}
          source={require("../../../assets/images/register.png")}
        />

        <View style={styles.subContainer}>
          <Text style={styles.title}>Register</Text>
          <View>
            <View style={styles.inputContainer}>
              <FontAwesome
                name="user"
                size={24}
                color="grey"
                style={styles.icon}
              />
              <TextInput
                style={{
                  ...styles.input,
                  marginTop: 10,
                }}
                placeholder="Username"
                value={registrationData.username}
                onChangeText={(text) => handleFieldChange("username", text)}
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
                value={registrationData.password}
                onChangeText={(text) => handleFieldChange("password", text)}
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
            <View style={styles.inputContainer}>
              <FontAwesome name="address-card" size={16} color="grey" />
              <TextInput
                style={{ ...styles.input, marginTop: 10 }}
                placeholder="Name"
                placeholderTextColor="grey"
                value={registrationData.name}
                onChangeText={(text) => handleFieldChange("name", text)}
              />
            </View>
            {errorMessages.name ? (
              <Text style={styles.errorMessage}>{errorMessages.name}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <FontAwesome name="street-view" size={21} color="grey" />
              <TextInput
                style={{ ...styles.input, marginTop: 10 }}
                placeholder="Address"
                placeholderTextColor="grey"
                value={registrationData.address}
                onChangeText={(text) => handleFieldChange("address", text)}
              />
            </View>
            {errorMessages.address ? (
              <Text style={styles.errorMessage}>{errorMessages.address}</Text>
            ) : null}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={registrationData.gender}
                onValueChange={(itemValue, itemIndex) =>
                  handleFieldChange("gender", itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Laki-laki" value="male" />
                <Picker.Item label="Perempuan" value="female" />
              </Picker>
            </View>
            {errorMessages.gender ? (
              <Text style={styles.errorMessage}>{errorMessages.gender}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="email-multiple"
                size={18}
                color="grey"
              />
              <TextInput
                style={{ ...styles.input, marginTop: 10 }}
                placeholder="Email"
                placeholderTextColor="grey"
                keyboardType="email-address"
                value={registrationData.email}
                onChangeText={(text) => handleFieldChange("email", text)}
              />
            </View>
            {errorMessages.email ? (
              <Text style={styles.errorMessage}>{errorMessages.email}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <FontAwesome5 name="phone-square-alt" size={21} color="grey" />
              <TextInput
                style={{ ...styles.input, marginTop: 10 }}
                placeholder="Mobile Phone"
                placeholderTextColor="grey"
                keyboardType="phone-pad"
                value={registrationData.mobilePhone}
                onChangeText={(text) => handleFieldChange("mobilePhone", text)}
              />
            </View>
            {errorMessages.mobilePhone ? (
              <Text style={styles.errorMessage}>
                {errorMessages.mobilePhone}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerButtonContainer}>
            <Text style={styles.text}>Already have account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signInText}>Sign in</Text>
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
    height: 350,
  },
  subContainer: {
    minWidth: "100%",
    height: "100%",
    backgroundColor: "#f1f1f1",
    marginTop: -57,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    height: 35,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "black",
    width: "97%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginTop: -9,
    marginBottom: 5,
    paddingLeft: 5,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordInput: {
    flex: 1,
    height: 35,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  toggleButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  pickerContainer: {
    height: 40,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: {
    height: 40,
    color: "grey",
    marginLeft: -8,
    marginTop: -8,
  },
  button: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 99,
    marginTop: 15,
  },
  text: {
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    color: "grey",
  },
  text: {
    color: "grey",
  },
  registerButton: {
    backgroundColor: "#F9A826",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  registerButtonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signInText: {
    textAlign: "center",
    fontSize: 14,
    color: "grey",
    fontWeight: "bold",
  },
});
