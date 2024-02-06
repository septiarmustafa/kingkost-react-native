import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("username")
      .then((uname) => {
        setUsername(uname);
      })
      .catch((err) => console.log(err));
    AsyncStorage.getItem("role")
      .then((role) => {
        setRole(role);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleProfilePress = () => {
    navigation.navigate("InfoProfile");
  };
  const handleHelpCenterPress = () => {
    navigation.navigate("HelpCenter");
  };
  const handlePrivacyAndPolicyPress = () => {
    navigation.navigate("PrivacyAndPolicy");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("role");
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/default-profile.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Muhammad Ibrahim</Text>
        <Text style={styles.userRole}>0814*****908</Text>
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
            <Text style={styles.settingsValue}>Ask...</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={handlePrivacyAndPolicyPress}
        >
          <FontAwesome name="font-awesome" size={24} color={"#333"} />
          <View style={styles.settingsTextContainer}>
            <Text style={styles.settingsTitle}>Privacy and Policy</Text>
            <Text style={styles.settingsValue}>Read...</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color={"white"} />
          <View style={styles.settingsTextContainer}>
            <Text style={{ ...styles.settingsTitle, color: "white" }}>
              Logout
            </Text>
            <Text style={{ ...styles.settingsValue, color: "white" }}>
              Bye:(
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
