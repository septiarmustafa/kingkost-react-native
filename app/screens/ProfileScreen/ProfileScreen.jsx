import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { BASE_HOST } from "../../config/BaseUrl";

export default ProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      console.log("Fetching user data...");
      const response = await fetch(`${BASE_HOST}/customer/user/${userId}`);
      const data = await response.json();
      setFullName(data.data.fullName);
      setPhoneNumber(data.data.phoneNumber);
      console.log("User data fetched:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("userId")
      .then((userId) => {
        setUserId(userId);
        fetchUserData(userId);
      })
      .catch((error) => {
        console.error("Error retrieving userId from AsyncStorage:", error);
      });
  }, [navigation]);

  const handleProfilePress = () => {
    navigation.navigate("InfoProfile", { userId: userId });
  };
  const handleHelpCenterPress = () => {
    navigation.navigate("HelpCenter");
  };
  const handlePrivacyAndPolicyPress = () => {
    navigation.navigate("PrivacyAndPolicy");
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["userId", "token", "role", "password"]);
      navigation.replace("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/default-profile.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{fullName}</Text>
        <Text style={styles.userRole}>{phoneNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={handleProfilePress}
        >
          <FontAwesome name="user" size={24} color={"#333"} />
          <View style={styles.settingsTextContainer}>
            <Text style={styles.settingsTitle}>Profile</Text>
            <Text style={styles.settingsValue}>Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <FontAwesome name="bell" size={24} color={"#333"} />
          <View style={styles.settingsTextContainer}>
            <Text style={styles.settingsTitle}>Notification</Text>
            <Text style={styles.settingsValue}>On</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <FontAwesome name="language" size={24} color={"#333"} />
          <View style={styles.settingsTextContainer}>
            <Text style={styles.settingsTitle}>Language</Text>
            <Text style={styles.settingsValue}>English</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <FontAwesome name="lightbulb-o" size={24} color={"#333"} />
          <View style={styles.settingsTextContainer}>
            <Text style={styles.settingsTitle}>Theme</Text>
            <Text style={styles.settingsValue}>Light</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={handleHelpCenterPress}
        >
          <FontAwesome name="question" size={24} color={"#333"} />
          <View style={styles.settingsTextContainer}>
            <Text style={styles.settingsTitle}>Help Center</Text>
            <Text style={styles.settingsValue}>Ask</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={handlePrivacyAndPolicyPress}
        >
          <FontAwesome name="font-awesome" size={24} color={"#333"} />
          <View style={styles.settingsTextContainer}>
            <Text style={styles.settingsTitle}>Privacy and Policy</Text>
            <Text style={styles.settingsValue}>Read More</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color={"white"} />
          <View style={styles.settingsTextContainer}>
            <Text style={{ ...styles.settingsTitle, color: "white" }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9A826",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  userRole: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderBottomColor: "#ccc",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#F9A826",
  },
  settingsTextContainer: {
    marginLeft: 10,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  settingsValue: {
    fontSize: 14,
    color: "#555",
  },
});
