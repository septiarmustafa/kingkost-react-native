import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import Colors from "../../utils/Colors";

export default Header = () => {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={{ color: Colors.DARK }}>Welcome,</Text>
          <Text style={{ color: Colors.DARK, fontSize: 20, fontWeight: "bold" }}>
            Septiar
          </Text>
        </View>
        <View style={styles.imageContainer} >
          <Image
            style={styles.profileImage}
            source={require("../../../assets/images/default-profile.jpg")}
          />
        </View>
      </View>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
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
    borderRadius: 50
  }
});
