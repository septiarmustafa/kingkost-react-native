import React from "react";
import { Pressable, Text, Image, StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../utils/Colors";
import { Fontisto, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
const { width } = Dimensions.get("screen");

export default KostCard = ({ kost, navigation }) => {
  return (
    <Pressable
      activeOpacity={0.8}
      onPress={() => navigation.navigate("DetailsScreen", kost)}
    >
      <View style={styles.card}>
        <Image source={kost.image} style={styles.cardImage} />
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{kost.title}</Text>
            <Text style={{ fontWeight: "bold", color: Colors.GREEN, fontSize: 16 }}>
              Rp 1.500.000
            </Text>
          </View>
          <Text style={{ color: Colors.GREY, fontSize: 14, marginTop: 5 }}>
            {kost.location}
          </Text>
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={styles.facility}>
              <Fontisto name="wifi-logo" size={20} color="black" />
            </View>
            <View style={styles.facility}>
              <FontAwesome5 name="parking" size={20} color="black" />
            </View>
            <View style={styles.facility}>
              <MaterialCommunityIcons name="air-conditioner" size={20} color="black" />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 350,
    backgroundColor: Colors.WHITE,
    elevation: 10,
    width: width / 1.2,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
  },
  facility: { flexDirection: "row", marginRight: 15 },
});

