import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import Colors from "../../utils/Colors";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/DetailKost/BackButton";
import TransactionItem from "../../components/PopularKostArea/TransactionItem";

const dummyTransactionData = [
  {
    id: "1",
    title: "Kost Puri Indah Menteng",
    price: 1600000,
    province: "DKI Jakarta",
    city: "Kota Adm. Jakarta Pusat",
    status: "pending",
    gender: "male",
    date: "2024-02-12",
  },
  {
    id: "2",
    title: "Kost Green Pramuka",
    price: 1450000,
    province: "Jawa Barat",
    city: "Kota Bandung",
    status: "approve",
    gender: "male",
    date: "2024-02-10",
  },
  {
    id: "3",
    title: "Royal Kost Menteng",
    price: 2540000,
    province: "Jawa Barat",
    city: "Kota Bogor",
    status: "approve",
    gender: "female",
    date: "2024-02-15",
  },
  {
    id: "4",
    title: "Luxury Kemang Kost",
    price: 2500000,
    province: "DI Yogyakarta",
    city: "Wonosari",
    status: "rejected",
    gender: "female",
    date: "2024-02-20",
  },
];

export default TransactionScreen = ({ navigation, route }) => {
  const [transactionData, setTransactionData] = useState(dummyTransactionData);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  const filteredData =
    activeFilter === "all"
      ? transactionData
      : transactionData.filter((item) => item.status === activeFilter);

  let noDataText = "";
  if (activeFilter === "pending" && filteredData.length === 0) {
    noDataText = (
      <View style={styles.noDataContainer}>
        <Image
          source={require("../../../assets/images/data-notfound.jpg")}
          style={styles.image}
        />
        <Text style={styles.noDataText}>No pending transaction</Text>
      </View>
    );
  } else if (activeFilter === "cancel" && filteredData.length === 0) {
    noDataText = (
      <View style={styles.noDataContainer}>
        <Image
          source={require("../../../assets/images/data-notfound.jpg")}
          style={styles.image}
        />
        <Text style={styles.noDataText}>No transaction cancelled</Text>
      </View>
    );
  } else if (activeFilter === "approve" && filteredData.length === 0) {
    noDataText = (
      <View style={styles.noDataContainer}>
        <Image
          source={require("../../../assets/images/data-notfound.jpg")}
          style={styles.image}
        />
        <Text style={styles.noDataText}>No transaction approved</Text>
      </View>
    );
  } else if (activeFilter === "rejected" && filteredData.length === 0) {
    noDataText = (
      <View style={styles.noDataContainer}>
        <Image
          source={require("../../../assets/images/data-notfound.jpg")}
          style={styles.image}
        />
        <Text style={styles.noDataText}>No transaction rejected</Text>
      </View>
    );
  } else {
    noDataText = "No transaction record yet";
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.WHITE}
        barStyle="dark-content"
      />
      <View style={styles.appBar}>
        <View style={styles.header}>
          <BackButton onPress={navigation.goBack} />
          <Text style={styles.title}>Transaction Record</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "all" && styles.activeFilter,
            ]}
            onPress={() => handleFilter("all")}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "pending" && styles.activeFilter,
            ]}
            onPress={() => handleFilter("pending")}
          >
            <Text style={styles.filterText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "approve" && styles.activeFilter,
            ]}
            onPress={() => handleFilter("approve")}
          >
            <Text style={styles.filterText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "cancel" && styles.activeFilter,
            ]}
            onPress={() => handleFilter("cancel")}
          >
            <Text style={styles.filterText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "rejected" && styles.activeFilter,
            ]}
            onPress={() => handleFilter("rejected")}
          >
            <Text style={styles.filterText}>Rejected</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listCard}>
          {filteredData.length === 0 ? (
            <Text style={styles.emptyText}>{noDataText}</Text>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <TransactionItem
                  item={item}
                  // onPress={() => navigation.navigate("DetailKostScreen", item)}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WEAK_COLOR,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 16,
  },
  activeFilter: {
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  listCard: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: Colors.GREY,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 20,
  },
  noDataText: {
    marginTop: 7,
    color: "grey",
  },
});
