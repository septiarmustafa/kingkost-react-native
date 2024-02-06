import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";

import Colors from "../../utils/Colors";
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import BackgroundImage from "../../components/DetailKost/BackgroundImage";
import ImageCardList from "../../components/DetailKost/ImageCardList";
import ImageModal from "../../components/DetailKost/ImageModal";
import DetailSection from "../../components/DetailKost/DetailSection";
const { width } = Dimensions.get("screen");

export default DetailKostScreen = ({ navigation, route }) => {
  const kost = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);


  const InteriorCard = ({ interior, index, onPress }) => {
    return (
      <TouchableOpacity onPress={() => onPress(index)}>
        <Image source={interior} style={style.interiorImage} />
      </TouchableOpacity>
    );
  };

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
          description="Kostan murah, lokasi strategis"
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
              <Text style={{ color: Colors.BLACK , fontWeight: "bold"}}>Pesan Sekarang</Text>
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
    paddingVertical: 10,
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
    paddingLeft: 7
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
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40, },
  facility: { flexDirection: "row", marginRight: 15, },
  facilityText: { marginLeft: 5, color: Colors.GREY, },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer : {
    paddingHorizontal: 20,

  },
  modalImageLarge: {
    width: '80%',
    height: '80%', 
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 45,
  },
});
