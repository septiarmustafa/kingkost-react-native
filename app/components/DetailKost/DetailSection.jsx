import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fontisto, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';

export default DetailsSection = ({ title, availability, roomCount, city, province, wifi, parking, airConditioner, description }) => {
  return (
    <View style={style.detailsContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        {city !== null && <Text style={{ fontSize: 16, color: Colors.GREY }}>{city}, {province}</Text>}
        </View>
        <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {availability !== null && (
            <View style={style.availableTag}>
              <Text style={{ color: Colors.WHITE }}>{availability}</Text>
            </View>
          )}
          {roomCount !== null && <Text style={{ fontSize: 13, marginLeft: 5 }}>{roomCount} room</Text>}
        </View>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
        {wifi !== null && (
          <View style={style.facility}>
            <Fontisto name="wifi-logo" size={20} color="black" />
          </View>
        )}
        {parking !== null && (
          <View style={style.facility}>
            <FontAwesome5 name="parking" size={20} color="black" />
          </View>
        )}
        {airConditioner !== null && (
          <View style={style.facility}>
            <MaterialCommunityIcons name="air-conditioner" size={20} color="black" />
          </View>
        )}
      </View>
        </View>
      </View>   
      <Text style={{ marginTop: 20, color: Colors.GREY }}>{description}</Text>
    </View>
  );
};

const style = StyleSheet.create ({
  detailsContainer: { paddingHorizontal: 20, marginTop: 20 },
  availableTag: {
    height: 30,
    width: 70,
    backgroundColor: Colors.GREEN,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  facility: { flexDirection: "row", marginRight: 15 },
});

