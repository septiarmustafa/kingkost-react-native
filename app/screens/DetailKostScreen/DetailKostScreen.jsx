import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

import Colors from "../../utils/Colors";
import { FlatList } from "react-native-gesture-handler";
import BackgroundImage from "../../components/DetailKost/BackgroundImage";
import ImageCardList from "../../components/DetailKost/ImageCardList";
import ImageModal from "../../components/DetailKost/ImageModal";
import DetailSection from "../../components/DetailKost/DetailSection";
const { width } = Dimensions.get("screen");

export default DetailKostScreen = ({ navigation, route }) => {
  const kost = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageIndex(null);

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <BackgroundImage source={require('../../../assets/images/jakarta.jpg')} onPress={navigation.goBack} />
        <View style={style.flatlistContainer}>
        <FlatList
          contentContainerStyle={{ marginTop: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, key) => key.toString()}
          data={kost.interiors}
          renderItem={({ item, index }) => (
            <ImageCardList interior={item} index={index} onPress={openModal} />
          )}
        />
        </View>
        <ImageModal
          visible={isModalVisible}
          closeModal={closeModal}
          imageSource={kost.interiors[selectedImageIndex]}
        />

        <DetailSection
          title="Your Kost Title"
          availability="Available"
          roomCount={10}
          city="Bogor"
          province="Jawa Barat"
          wifi="wifi" 
          parking={null} 
          airConditioner="air conditioner" 
          description="Kostan murah, lokasi strategis, dekat dengan stasiun"
          gender={require("../../../assets/icons/male.jpg")}
        />

          <View style={style.price}>
            <View>
            <Text
                style={{ fontSize: 12, color: Colors.GREY, fontWeight: "bold" }}
              >
                Price
              </Text>
              <Text
                style={{
                  color: Colors.GREEN,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Rp 1.500.000 / Bulan
              </Text>
            </View>
            <View style={style.bookNowBtn}>
              <Text style={{ color: Colors.BLACK , fontWeight: "bold"}}>Book Now</Text>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  price: {
    height: 70,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  flatlistContainer : {
    paddingHorizontal: 20,

  },
});
