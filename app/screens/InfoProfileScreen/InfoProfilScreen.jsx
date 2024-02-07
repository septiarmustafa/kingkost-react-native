import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "../../components/DetailKost/BackButton";

export default function InfoProfileScreen({ navigation }) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [err, setErr] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
  });

  const handleUsername = (text) => {
    setusername(text);
    setErrorMessages({ ...errorMessages, username: "" });
  };
  const handlePassword = (text) => {
    setPassword(text);
    setErrorMessages({ ...errorMessages, password: "" });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.loginImage}
          source={require("../../../assets/images/infoprofil.png")}
        />
        <View style={{ position: "absolute", top: 10, left: "4%" }}>
          <BackButton onPress={navigation.goBack} />
        </View>
        <View style={styles.infoProfilContainer}>
          <Text style={styles.title}>Info Profile</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="grey" />
            <TextInput style={styles.input} value="bamz666" />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="address-card" size={16} color="grey" />
            <TextInput style={styles.input} value="Muhammad Ibrahim" />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="street-view" size={21} color="grey" />
            <TextInput style={styles.input} value="Jalan Buntu" />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-multiple"
              size={18}
              color="grey"
            />
            <TextInput style={styles.input} value="muh.ibrahim666@gmail.com" />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone-square-alt" size={21} color="grey" />
            <TextInput style={styles.input} value="0814*****908" />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress>
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
