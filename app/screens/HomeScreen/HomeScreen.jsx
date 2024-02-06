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
  const dummyData = [
    {
      id: '1',
      title: 'Kost Martini',
      image: require('../../../assets/images/jakarta.jpg'),
      location: 'Dramaga, Kota Bogor',
      city: 'Jakarta',
      gender: 'female',
      price: 800000,
      interiors: [
        require('../../../assets/images/jakarta.jpg'),
        require('../../../assets/images/banner1.jpg'),
        require('../../../assets/images/banner2.jpg'),
      ]
    },
    {
      id: '2',
      title: 'Green Kost',
      image: require('../../../assets/images/jakarta.jpg'),
      location: 'Pasar Minggu, Jakarta Selatan',
      city: 'Bandung',
      gender: 'male',
      price: 600000,
      interiors: [
        require('../../../assets/images/jakarta.jpg'),
        require('../../../assets/images/jakarta.jpg'),
        require('../../../assets/images/jakarta.jpg'),
      ]
    },
    {
      id: '3',
      title: 'Kost Bu Haji',
      image: require('../../../assets/images/jakarta.jpg'),
      location: 'Ciracas, Jakarta Timur',
      city: 'Tangerang',
      gender: 'male',
      price: 1500000,
      interiors: [
        require('../../../assets/images/jakarta.jpg'),
        require('../../../assets/images/jakarta.jpg'),
        require('../../../assets/images/jakarta.jpg'),
      ]
    },
  ];

  const carouselImages = [
    require('../../../assets/images/banner1.jpg'),
    require('../../../assets/images/banner2.jpg'),
    require('../../../assets/images/banner3.jpg'),
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
        <ListOptions />
        <CustomTitle title="Area Kost Terpopuler" />
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          horizontal
          data={dummyData}
          renderItem={({ item }) => <KostAreaCard kostArea={item} navigation={navigation} />}
        />
        <CustomTitle title="Kost" subTitle="Lihat Semua" />
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          horizontal
          data={dummyData}
          renderItem={({ item }) => <KostCard kost={item} navigation={navigation} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
