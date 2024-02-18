import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import  {OpenWhatsApp} from '../../utils/OpenWhatsapp';
import Colors from "../../utils/Colors";
import { FlatList } from "react-native-gesture-handler";
import BackgroundImage from "../../components/DetailKost/BackgroundImage";
import ImageCardList from "../../components/DetailKost/ImageCardList";
import ImageModal from "../../components/DetailKost/ImageModal";
import DetailSection from "../../components/DetailKost/DetailSection";
import formatCurrencyIDR from "../../utils/formatCurrencyIDR";
import SellerInfo from "../../components/DetailKost/SellerInfo";
import ChoosePeriod from "../../components/DetailKost/ChoosePeriod";
import TotalPrice from "../../components/DetailKost/TotalPrice";
import { StatusBar } from "expo-status-bar";
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
      <StatusBar
        translucent={false}
        backgroundColor={Colors.WHITE}
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackgroundImage
          source={kost.image != null || kost.image != "" ? { uri: kost.image } : require("../../../assets/images/default-image.png")}
          onPress={navigation.goBack}
        />
        <View style={styles.flatListContainer}>
          {kost.images !== null || kost.images.length != 0 ? (<FlatList
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={kost.images}
            renderItem={({ item, index }) => (
              <ImageCardList
                interior={item}
                index={index}
                onPress={openModal}
              />
            )}
          />) : (<Image source={require("../../../assets/images/default-image.png")} style={styles.cardImage} />)}


        </View>
        <ImageModal
          visible={isModalVisible}
          closeModal={closeModal}
          imageSource={kost.images[selectedImageIndex]}
        />

        <DetailSection
          title={kost.title}
          availability={kost.availableRoom != 0 ? "Available" : "Not Available"}
          roomCount={kost.availableRoom}
          city={kost.city}
          subdistrict={kost.subdistrict}
          province={kost.province}
          wifi={kost.isWifi}
          parking={kost.isParking}
          airConditioner={kost.isAc}
          description={kost.description}
          gender={
            kost.gender === "male"
              ? require("../../../assets/icons/male.jpg")
              : require("../../../assets/icons/female.jpg")
          }
        />

        <SellerInfo
          onPress={() => OpenWhatsApp(phone = kost.sellerPhone, message = `Halo! Saya ingin bertanya tentang kost "${kost.title}"`)}
          seller={kost.sellerName}
          phone={kost.sellerPhone}
          image={require("../../../assets/images/default-profile.jpg")}
        />
        <ChoosePeriod
          title="Simulate Prices"
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
        />
        <TotalPrice
          onPress={() => navigation.navigate("CreateOrderScreen", kost)}
          calculateTotalPrice={calculateTotalPrice}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 20,
  },
  cardImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: Colors.WEAK_COLOR
  }
});
