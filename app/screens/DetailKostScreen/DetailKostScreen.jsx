import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";

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
          source={require("../../../assets/images/jakarta.jpg")}
          onPress={navigation.goBack}
        />
        <View style={styles.flatListContainer}>
          <FlatList
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={kost.interiors}
            renderItem={({ item, index }) => (
              <ImageCardList
                interior={item}
                index={index}
                onPress={openModal}
              />
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

        <SellerInfo
          seller={kost.seller}
          phone={kost.phone}
          image={require("../../../assets/images/default-profile.jpg")}
        />
        <ChoosePeriod
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
        />
        <TotalPrice onPress={()=>navigation.navigate("CreateOrderScreen")} calculateTotalPrice={calculateTotalPrice} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 20,
  },
});
