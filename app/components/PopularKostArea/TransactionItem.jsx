import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import formatCurrencyIDR from "../../utils/formatCurrencyIDR";
import Facility from "../Facility";
import Colors from "../../utils/Colors";
import TransactionStatusBadge from "../TransactionStatusBadge";
import DateFormatter from "../../utils/DateFormatter";

const getRandomImage = () => {
  const baseUrl = "https://source.unsplash.com/";
  const imageSize = "800x600";
  return `${baseUrl}${imageSize}/?house=${Math.random()}`;
};

export default TransactionItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: getRandomImage() }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.titleLocationPriceContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.kost.name}</Text>
              <Text style={styles.location}>
                {item.kost.city.name}, {item.kost.province.name}
              </Text>
              <Text style={styles.price}>
                {formatCurrencyIDR(item.kost.kostPrices[0].price)} / Bulan
              </Text>
            </View>
            <TransactionStatusBadge
              status={item.aprStatus}
              date={DateFormatter.formatDate(item.createdAt, "dd-mm-yyyy")}
            />
          </View>
          <View style={styles.facilityContainer}>
            <Facility
              wifi={item.kost.isWifi}
              parking={item.kost.isParking}
              airConditioner={item.kost.isAc}
            />
            <View style={styles.genderContainer}>
              <Image
                style={styles.genderIcon}
                source={
                  item.kost.genderType.name == "MALE"
                    ? require("../../../assets/icons/male.jpg")
                    : require("../../../assets/icons/female.jpg")
                }
              />
              <Text style={styles.genderText}>
                {item.kost.genderType.name == "MALE" ? "Male" : "Female"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titleLocationPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: Colors.GREY,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.GREEN,
  },
  facilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  genderText: {
    fontSize: 13,
  },
});
