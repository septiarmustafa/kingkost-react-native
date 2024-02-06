import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";

export default OptionsCard = ({ title, img }) => {
  return (
    <View style={styles.optionsCard}>
      <Image source={img} style={styles.optionsCardImage} />
      <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsCard: {
    height: 140,
    width: "30%",
    elevation: 15,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  optionsCardImage: {
    height: 80,
    borderRadius: 10,
    width: "70%",
  },
});