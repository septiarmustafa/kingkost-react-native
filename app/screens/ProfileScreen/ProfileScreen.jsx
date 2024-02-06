import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../../utils/Colors";
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width } = Dimensions.get("screen");
export default DetailKostScreen = ({ navigation, route }) => {
  const kost = route.params;

  const InteriorCard = ({ interior }) => {
    return <Image source={interior} style={style.interiorImage} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* kost image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground
            style={style.backgroundImage}
            source={require("../../../assets/favicon.png")}
          >
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
              <View style={style.headerBtn}>
                <Icon name="favorite" size={20} color={Colors.RED} />
              </View>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}
          {/* <View style={style.virtualTag}>
            <Text style={{ color: Colors.WHITE }}>Virtual tour</Text>
          </View> */}
        </View>

        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Title</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={style.availableTag}>
                <Text style={{ color: Colors.WHITE }}>Available</Text>
              </View>
              <Text style={{ fontSize: 13, marginLeft: 5 }}>10 room</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={{ fontSize: 16, color: Colors.GREY }}>Bogor</Text>

          {/* Facilities container */}
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={style.facility}>
              <Fontisto name="wifi-logo" size={20} color="black" />
            </View>
            <View style={style.facility}>
              <FontAwesome5 name="parking" size={20} color="black" />
            </View>
            <View style={style.facility}>
              <MaterialCommunityIcons name="air-conditioner" size={20} color="black" />
            </View>
          </View>
          <Text style={{ marginTop: 20, color: Colors.GREY }}>Detail</Text>

          {/* Interior list */}
          {/* <FlatList
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={kost.interiors}
            renderItem={({ item }) => <InteriorCard interior={item} />}
          /> */}

          {/* footer container */}
          <View style={style.footer}>
            <View>
              <Text
                style={{
                  color: Colors.GREEN,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Rp 1.500.000
              </Text>
              <Text
                style={{ fontSize: 12, color: Colors.GREY, fontWeight: "bold" }}
              >
                Total Price
              </Text>
            </View>
            <View style={style.bookNowBtn}>
              <Text style={{ color: Colors.WHITE }}>Book Now</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  availableTag: {
    height: 30,
    width: 70,
    backgroundColor: Colors.GREEN,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.BLACK,
    justifyContent: "center",
    alignItems: "center",
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: Colors.GREY },
});
