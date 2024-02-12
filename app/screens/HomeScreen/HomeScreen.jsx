import React from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../../utils/Colors";
import Header from "../../components/Home/Header";
import ListOptions from "../../components/Home/ListOptions";
import KostAreaCard from "../../components/Home/KostAreaCard";
import KostCard from "../../components/Home/KostCard";
import CustomTitle from "../../components/Home/CustomTitle";

const { width } = Dimensions.get("screen");
export default HomeScreen = ({ navigation }) => {

  const listKost = [
    {
      id: "1",
      title: "Kost Martini",
      image: require("../../../assets/images/jakarta.jpg"),
      location: "Dramaga, Kota Bogor",
      city: "Jakarta",
      gender: "female",
      price: 800000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/banner1.jpg"),
        require("../../../assets/images/banner2.jpg"),
      ],
    },
    {
      id: "2",
      title: "Green Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      location: "Pasar Minggu, Jakarta Selatan",
      city: "Bandung",
      gender: "male",
      price: 600000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
      ],
    },
    {
      id: "3",
      title: "Kost Bu Haji",
      image: require("../../../assets/images/jakarta.jpg"),
      location: "Ciracas, Jakarta Timur",
      city: "Tangerang",
      gender: "male",
      price: 1500000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
      ],
    },
  ];

  const listKostByArea = [
    {
      id: '1',
      image: require('../../../assets/images/jakarta.jpg'),
      city: 'Jakarta'
    },
    {
      id: '2',
      image: require('../../../assets/images/jakarta.jpg'),
      city: 'Bandung'
    },
    {
      id: '3',
      image: require('../../../assets/images/jakarta.jpg'),
      city: 'Bogor'
    },
  ];

  const kostJakarta = [
    {
      id: "1",
      title: "Blue Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      district: "Ragunan",
      city: "Jakarta",
      province: "DKI Jakarta",
      gender: "male",
      price: 550000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
      ],
    },
    {
      id: "2",
      title: "Green Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      district: "Ciracas",
      city: "Jakarta",
      province: "DKI Jakarta",
      gender: "male",
      price: 600000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
      ],
    },
    {
      id: "3",
      title: "Blue Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      district: "Ragunan",
      city: "Jakarta",
      province: "DKI Jakarta",
      gender: "male",
      price: 550000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
      ],
    },
    {
      id: "4",
      title: "Green Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      district: "Ciracas",
      city: "Jakarta",
      province: "DKI Jakarta",
      gender: "male",
      price: 600000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
      ],
    },
  ];

  const kostBandung = [
    {
      id: "100",
      title: "Blue Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      district: "Soreang",
      city: "Bandung",
      province: "Jawa Barat",
      gender: "male",
      price: 550000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),

      ],
    },
    {
      id: "201",
      title: "Green Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      district: "Batu tulis",
      city: "Bandung",
      province: "Jawa Barat",
      gender: "male",
      price: 600000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
      ],
    },
  ];

  const kostBogor = [
    {
      id: "100",
      title: "Blue Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      district: "Tanah Sereal",
      city: "Bogor",
      province: "Jawa Barat",
      gender: "male",
      price: 550000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),

      ],
    },
    {
      id: "201",
      title: "Green Kost",
      image: require("../../../assets/images/jakarta.jpg"),
      district: "Dramaga",
      city: "Bogor",
      province: "Jawa Barat",
      gender: "male",
      price: 600000,
      interiors: [
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
        require("../../../assets/images/jakarta.jpg"),
      ],
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
        <StatusBar
        translucent={false}
        backgroundColor={Colors.WHITE}
        barStyle="dark-content"
      />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 20 }}>
          <CustomTitle title="Pilih Preferensi Kost" />
        </View>
        <ListOptions navigation={navigation} />
        <CustomTitle title="Area Kost Terpopuler" />
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          horizontal
          data={listKostByArea}
          renderItem={({ item }) => (
            <KostAreaCard
              listKostArea={item.city === "Jakarta" ? kostJakarta : item.city === "Bogor" ? kostBogor : item.city === "Bandung" ? kostBandung : []}
              kostArea={item}
              navigation={navigation}
            />
          )}
        />
        <CustomTitle onPress={() => navigation.navigate("ListAllKostScreen", listKost)} title="Kost" subTitle="Lihat Semua" />
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          horizontal
          data={listKost}
          renderItem={({ item }) => (
            <KostCard kost={item} navigation={navigation} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
