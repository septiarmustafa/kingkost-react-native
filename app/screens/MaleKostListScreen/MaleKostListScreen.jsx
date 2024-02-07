import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Image,
  TouchableOpacity,
} from "react-native";
import BackButton from "../../components/DetailKost/BackButton";
import { Picker } from "@react-native-picker/picker";

const getRandomImage = () => {
  const baseUrl = "https://source.unsplash.com/";
  const imageSize = "800x600";
  return `${baseUrl}${imageSize}/?property=${Math.random()}`;
};

export default function MaleKostListScreen({ navigation, route }) {
  const products = [
    {
      id: 1,
      productName: "Kost Putra 1",
      description: "Kost untuk pria dengan fasilitas lengkap",
      price: 500000,
    },
    {
      id: 2,
      productName: "Kost Putra 2",
      description: "Kost eksklusif untuk pria",
      price: 600000,
    },
    {
      id: 3,
      productName: "Kost Putra 3",
      description: "Kost nyaman untuk pria mahasiswa",
      price: 450000,
    },
    {
      id: 4,
      productName: "Kost Putra 4",
      description: "Kost menawan untuk pria",
      price: 550000,
    },
    {
      id: 5,
      productName: "Kost Putra 5",
      description: "Kost dengan fasilitas lengkap untuk pria",
      price: 650000,
    },
    {
      id: 6,
      productName: "Kost Putra 6",
      description: "Kost dekat kampus untuk pria",
      price: 480000,
    },
    {
      id: 7,
      productName: "Kost Putra 7",
      description: "Kost dengan suasana tenang untuk pria",
      price: 520000,
    },
    {
      id: 8,
      productName: "Kost Putra 8",
      description: "Kost mewah dengan fasilitas eksklusif untuk pria",
      price: 700000,
    },
    {
      id: 9,
      productName: "Kost Putra 9",
      description: "Kost nyaman dan terjangkau untuk pria",
      price: 400000,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Picker>
        <Picker.Item label="Select Gender" style={{ color: "grey" }} value="" />
        <Picker.Item style={{ color: "grey" }} value="Jakarta Pusat" />
      </Picker>
      <BackButton />
      <SectionList
        sections={[{ title: "Kost List", data: products }]}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => {
              navigation.navigate("detail", {
                products: item,
              });
            }}
          >
            <Image source={{ uri: getRandomImage() }} style={styles.image} />

            <View style={styles.itemDetails}>
              <Text style={styles.title}>{item.productName}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>Rp. {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  sectionItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 7,
    borderRadius: 8,
    shadowColor: "orange",
    elevation: 5,
  },

  itemDetails: {
    marginLeft: 16,
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginTop: 7,
  },
  title: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: "#F9A826",
    marginTop: 5,
    fontWeight: "bold",
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionHeaderText: {
    marginTop: 20,
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
});
