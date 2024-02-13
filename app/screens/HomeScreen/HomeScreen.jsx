import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";
import Colors from "../../utils/Colors";
import Header from "../../components/Home/Header";
import ListOptions from "../../components/Home/ListOptions";
import KostAreaCard from "../../components/Home/KostAreaCard";
import KostCard from "../../components/Home/KostCard";
import CustomTitle from "../../components/Home/CustomTitle";
import CarouselBanner from "../../components/Home/CarouselBanner";
import http from "../../config/HttpConfig"
import { BASE_HOST } from "../../config/BaseUrl";
import LoadingComponent from "../../components/LoadingComponent";

const { width } = Dimensions.get("screen");
export default HomeScreen = ({ navigation }) => {
  const [listKost, setListKost] = useState([]);
  const [femaleKostData, setFemaleKostData] = useState([]);
  const [maleKostData, setMaleKostData] = useState([]);
  const [kostJakarta, setKostJakarta] = useState([]);
  const [kostBogor, setKostBogor] = useState([]);
  const [kostBandung, setKostBandung] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchKostData();
  }, [listKost], [kostJakarta], [kostBogor], [kostBandung], );
  const fetchKostData = async () => {
    try {
      const response = await http.get('/kost?page=0');
      const data = response.data;
      const kostData = data.data.map((item) => ({
        id: item.id,
        title: item.name,
        image: item.images[0].fileName,
        subdistrict: item.subdistrict.name,
        city: item.city.name,
        description: item.description,
        province: item.city.province.name,
        gender: item.genderType.name.toLowerCase(),
        price: item.kostPrice.price,
        sellerName: item.seller.fullName,
        sellerPhone: item.seller.phoneNumber,
        availableRoom: item.availableRoom,
        isWifi: item.isWifi,
        isAc: item.isAc,
        isParking: item.isParking,
        images: item.images.map((image) => ({
          uri: `${BASE_HOST}/${image.fileName}`,
        })),
      }));
      const kostJakarta = kostData.filter((item) => item.city.toLowerCase().includes("jakarta"));
      const kostBandung = kostData.filter((item) => item.city.toLowerCase().includes("bandung"));
      const kostBogor = kostData.filter((item) => item.city.toLowerCase().includes("bogor"));

      const maleKostData = listKost.filter((item) => item.gender === "male");
      const femaleKostData = listKost.filter((item) => item.gender === "female");
    
      setKostBandung(kostBandung)
      setKostBogor(kostBogor)
      setKostJakarta(kostJakarta)
      setListKost(kostData);
      setMaleKostData(maleKostData)
      setFemaleKostData(femaleKostData)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const listKostByArea = [
    {
      id: "1",
      image: require("../../../assets/images/jakarta.jpg"),
      city: "Jakarta",
    },
    {
      id: "2",
      image: require("../../../assets/images/jakarta.jpg"),
      city: "Bandung",
    },
    {
      id: "3",
      image: require("../../../assets/images/jakarta.jpg"),
      city: "Bogor",
    },
  ];
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.WHITE}
        barStyle="dark-content"
      />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CarouselBanner />
        <View style={{ marginBottom: 20 }}>
          <CustomTitle title="Pilih Preferensi Kost" />
        </View>
        <ListOptions
          navigation={navigation}
          maleKostData={maleKostData}
          femaleKostData={femaleKostData}
        />
        <CustomTitle title="Area Kost Terpopuler" />
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          horizontal
          data={listKostByArea}
          renderItem={({ item }) => (
            <KostAreaCard
              listKostArea={
                item.city === "Jakarta"
                  ? kostJakarta
                  : item.city === "Bogor"
                    ? kostBogor
                    : item.city === "Bandung"
                      ? kostBandung
                      : []
              }
              kostArea={item}
              navigation={navigation}
            />
          )}
        />
        <CustomTitle onPress={() => navigation.navigate("ListAllKostScreen", listKost)} title="Kost" subTitle="Lihat Semua" />
        {listKost.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No kosts available</Text>
          </View>
        ) : (
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
