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
import http from "../../config/HttpConfig";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

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
    url: "",
  });

  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await http.get(`/gender/v1`);
        setGenders(response.data);
      } catch (error) {
        console.error("Error fetching genders:", error);
      }
    };
    fetchGenders();
  }, []);

  useEffect(() => {
    const { userId } = route.params;
    fetchUserData(userId);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("password")
      .then((pw) => {
        handleChange("password", pw);
      })
      .catch((err) => console.log(err));
  }, [userData.password]);

  const fetchUserData = async (userId) => {
    try {
      const response = await http.get(`/customer/user/${userId}`);
      if (
        !response.data.data.code === 200 ||
        !response.data.data.code === 201
      ) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.data.data;
      setUserData(userData);

      handleChange("genderTypeId", userData.genderTypeId.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await http.put(`/customer/v1`, userData);

      if (!response.data.code === 201 || !response.data.code === 200) {
        throw new Error("Failed to update user data");
      }

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
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

  const handleChooseImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        uploadImage(result.uri);
      }
    } catch (error) {
      console.error("Error choosing image:", error);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("profileImage", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    try {
      const response = await http.post(`/customer/v1/upload/${userData.id}`, {
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        const { url } = responseData;
        setUserData((prevUserData) => ({ ...prevUserData, url }));
        Alert.alert("Success", "Profile picture updated successfully");
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert(
        "Error",
        "Failed to upload profile picture. Please try again."
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.loginImage} source={{ uri: userData.url }} />
        <TouchableOpacity onPress={handleChooseImage}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        <View style={{ position: "absolute", top: 10, left: "4%" }}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.infoProfilContainer}>
          <Text style={styles.title}>Info Profile</Text>
          <Text style={styles.inputTitle}>Name</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
          </View>
          <Text style={styles.inputTitle}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={userData.genderTypeId}
              onValueChange={(itemValue, itemIndex) =>
                handleChange("genderTypeId", itemValue)
              }
              style={{ marginTop: -8 }}
            >
              <Picker.Item
                label="Select Gender"
                style={{ color: "grey" }}
                value=""
              />
              {genders &&
                genders.map((gender) => (
                  <Picker.Item
                    key={gender.id}
                    label={gender.name}
                    value={gender.id}
                  />
                ))}
            </Picker>
          </View>

          <Text style={styles.inputTitle}>Email</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>
          <Text style={styles.inputTitle}>Address</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="home" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.address}
              onChangeText={(text) => handleChange("address", text)}
            />
          </View>
          <Text style={styles.inputTitle}>Phone</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone" size={24} color="grey" />
            <TextInput
              style={styles.input}
              value={userData.phoneNumber}
              onChangeText={(text) => handleChange("phoneNumber", text)}
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
  changePhotoText: {
    color: "white",
    fontWeight: "bold",
    marginTop: -260,
    marginLeft: 230,
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
  inputTitle: {
    paddingLeft: 8,
    fontWeight: "bold",
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
});
