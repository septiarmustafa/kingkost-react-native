import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from "react-native";
import http from "../../config/HttpConfig";
import Colors from "../../utils/Colors";
import { StatusBar } from "expo-status-bar";
import DetailSection from "../../components/DetailKost/DetailSection";
import SellerInfo from "../../components/DetailKost/SellerInfo";
import { OpenWhatsApp } from "../../utils/OpenWhatsapp";
import TotalPrice from "../../components/DetailKost/TotalPrice";
import MonthTypeConverter from "../../utils/MonthTypeConverter";
const { width } = Dimensions.get("screen");

export default DetailTransactionScreen = ({ navigation, route }) => {
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await http.get(`/transactions/${transactionId}`);
        setTransaction(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const calculateTotalPrice = () => {
    const selectedMonths = MonthTypeConverter.getMonthCount(
      transaction.monthType.name
    );
    const monthlyPrice = transaction.kost.kostPrices[0].price;
    const totalPrice = selectedMonths * monthlyPrice;

    return formatCurrencyIDR(totalPrice);
  };

  if (!transaction) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.WHITE}
        barStyle="dark-content"
      />
      <DetailSection
        title={transaction.kost.name}
        availability={
          transaction.kost.availableRoom != 0 ? "Available" : "Not Available"
        }
        roomCount={transaction.kost.availableRoom}
        city={transaction.kost.city.name}
        subdistrict={transaction.kost.subdistrict.name}
        province={transaction.kost.province.name}
        wifi={transaction.isWifi}
        parking={transaction.isParking}
        airConditioner={transaction.isAc}
        description={transaction.kost.description}
        gender={
          transaction.kost.genderType.name === "MALE"
            ? require("../../../assets/icons/male.jpg")
            : require("../../../assets/icons/female.jpg")
        }
      />

      <SellerInfo
        onPress={() =>
          OpenWhatsApp(
            (phone = transaction.kost.seller.phoneNumber),
            (message = `Halo! Saya ingin bertanya tentang kost "${transaction.kost.name}"`)
          )
        }
        seller={transaction.kost.seller.fullName}
        phone={transaction.kost.seller.phoneNumber}
        image={require("../../../assets/images/default-profile.jpg")}
      />

      <ChoosePeriod
        title="Rent for: "
        selectedMonths="mbew"
        setSelectedMonths="4 months"
      />

      <TotalPrice calculateTotalPrice={calculateTotalPrice} />
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
    backgroundColor: Colors.WEAK_COLOR,
  },
});
