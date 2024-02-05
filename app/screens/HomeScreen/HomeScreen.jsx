import React from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Colors from "../../utils/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width } = Dimensions.get("screen");
export default HomeScreen = ({ navigation }) => {
  const optionsList = [
    { title: "Kost Putra", img: require("../../../assets/favicon.png") },
    { title: "Kost Putri", img: require("../../../assets/favicon.png") },
  ];

  const ListOptions = () => {
    return (
      <View style={style.optionListsContainer}>
          <View style={style.optionsCard}>
            <Image
              source={optionsList[0].img}
              style={style.optionsCardImage}
            />
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {optionsList[0].title}
            </Text>
          </View>
          <View style={style.optionsCard}>
            <Image
              source={optionsList[1].img}
              style={style.optionsCardImage}
            />
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {optionsList[1].title}
            </Text>
          </View>
      </View>
      
    );
  };

  const dummyData = [
    {
      id: '1',
      title: 'Kost Martini',
      image: require('../../../assets/favicon.png'),
      location: 'Dramaga, Kota Bogor',
    },
    {
      id: '2',
      title: 'Green Kost',
      image: require('../../../assets/favicon.png'),
      location: 'Pasar Minggu, Jakarta Selatan',
    },
    {
      id: '3',
      title: 'Kost Bu Haji',
      image: require('../../../assets/favicon.png'),
      location: 'Ciracas, Jakarta Timur',
    },
  ];
  const Card = ({ house }) => {
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => navigation.navigate("DetailsScreen", house)}
      >
        <View style={style.card}>
          <Image source={house.image} style={style.cardImage} />
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {house.title}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: Colors.GREEN,
                  fontSize: 16,
                }}
              >
                Rp 1.500.000
              </Text>
            </View>


            <Text style={{ color: Colors.GREY, fontSize: 14, marginTop: 5 }}>
              {house.location}
            </Text>

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
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.WHITE}
        barStyle="dark-content"
      />
      <View style={style.header}>
        <View>
          <Text style={{ color: Colors.GREY }}>Welcome,</Text>
          <Text
            style={{ color: Colors.BLACK, fontSize: 20, fontWeight: "bold" }}
          >
            Septiar
          </Text>
        </View>
        <Image
          style={style.profileImage}
          source={require("../../../assets/images/default-profile.jpg")}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View style={style.searchInputContainer}>
            <Icon name="search" color={Colors.GREY} size={25} />
            <TextInput placeholder="Cari nama kost" />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={Colors.WHITE} size={25} />
          </View>
        </View> */}

        <Text
            style={{ color: Colors.BLACK, fontSize: 20, fontWeight: "bold" ,  paddingHorizontal: 20,}}
          >
            Pilih Preferensi Kost
          </Text>

        <ListOptions />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >

          <View>
            <Text
            style={{ color: Colors.BLACK, fontSize: 20, fontWeight: "bold" ,  marginTop: 10}}
            >
            Kost
            </Text>
          </View>

          <View>
            <Text
            style={{ color: Colors.BLACK, fontSize: 18,fontStyle: "italic", fontWeight: "normal" ,  marginTop: 10}}
            >
            Lihat semua
            </Text>
          </View>
        </View>

        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          horizontal
          data={dummyData}
          renderItem={({ item }) => <Card house={item} />}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >

          <View>
            <Text
            style={{ color: Colors.BLACK, fontSize: 20, fontWeight: "bold" ,  marginTop: 10}}
            >
            Area Kost Terpopuler
            </Text>
          </View>

          <View>
            <Text
            style={{ color: Colors.BLACK, fontSize: 18,fontStyle: "italic", fontWeight: "normal" ,  marginTop: 10}}
            >
            Lihat semua
            </Text>
          </View>
        </View>
         <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
          horizontal
          data={dummyData}
          renderItem={({ item }) => <Card house={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: Colors.WHITE,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: Colors.BLACK,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: "100%",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: Colors.GREY,
  },
  activeCategoryListText: {
    color: Colors.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  card: {
    height: 250,
    backgroundColor: Colors.WHITE,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: Colors.GREY },
});
