import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

import Colors from "../../utils/Colors";
import { FlatList } from "react-native-gesture-handler";
import BackgroundImage from "../../components/DetailKost/BackgroundImage";
import ImageCardList from "../../components/DetailKost/ImageCardList";
import ImageModal from "../../components/DetailKost/ImageModal";
import DetailSection from "../../components/DetailKost/DetailSection";
import { Picker } from "@react-native-picker/picker";
import formatCurrencyIDR from "../../utils/formatCurrencyIDR";
import { FontAwesome } from '@expo/vector-icons';
import SellerInfo from "../../components/DetailKost/SellerInfo";
import ChoosePeriod from "../../components/DetailKost/ChoosePeriod";
import TotalPrice from "../../components/DetailKost/TotalPrice";
const { width } = Dimensions.get("screen");

export default DetailKostScreen = ({ navigation, route }) => {
  const kost = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState(1);


  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageIndex(null);

  };
  const calculateTotalPrice = () => {
    const monthlyPrice = kost.price;
    const totalPrice = selectedMonths * monthlyPrice;
    return formatCurrencyIDR(totalPrice);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackgroundImage source={require('../../../assets/images/jakarta.jpg')} onPress={navigation.goBack} />
        <View style={styles.flatlistContainer}>
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
          title={kost.title}
          availability={kost.available ?? "Available"}
          roomCount={10}
          city={kost.city}
          province={kost.province ?? "Jawa Barat"}
          wifi="wifi"
          parking={null}
          airConditioner="air conditioner"
          description="Kostan murah, lokasi strategis, dekat dengan stasiun"
          gender={require("../../../assets/icons/male.jpg")}
        />
        
        <SellerInfo seller={kost.seller} phone={kost.phone} />
        <ChoosePeriod selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths} />
        <TotalPrice calculateTotalPrice={calculateTotalPrice} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  bookNowButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  flatlistContainer: {
    paddingHorizontal: 20,
  },
  bookNowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthPicker: {
    width: 150,
    height: 50,
  },

  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: Colors.WEAK_COLOR,
    borderRadius: 10,
  },
  profileContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.GREY,
  },
  sellerInfo: {
    marginLeft: 20,
  },
  sellerName: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: "bold",
  },
  whatsappContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  whatsappIcon: {
    marginRight: 8,
  },
  choosePeriodContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: Colors.WEAK_COLOR,
    borderRadius: 10,
  },
  choosePeriodContent: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  choosePeriodText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: "bold",
    marginLeft: 20,
  },
  pickerContainer: {
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 10,
    width: width / 2.8,
    marginRight: 10,
  },
  priceContainer: {
    height: 70,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  totalPriceText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: "bold",
  },
  totalPriceValue: {
    color: Colors.GREEN,
    fontWeight: "bold",
    fontSize: 18,
  },
});
