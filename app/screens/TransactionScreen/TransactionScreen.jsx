import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Colors from "../../utils/Colors";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/DetailKost/BackButton";
import TransactionItem from "../../components/PopularKostArea/TransactionItem";

const dummyTransactionData = [
  { id: "1", status: "pending" },
  { id: "2", status: "approve" },
  { id: "3", status: "approve" },
  { id: "4", status: "rejected" },
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
    noDataText = "No transaction pending";
  } else if (activeFilter === "cancel" && filteredData.length === 0) {
    noDataText = "No transaction cancelled";
  } else if (activeFilter === "approve" && filteredData.length === 0) {
    noDataText = "No transaction approved";
  } else if (activeFilter === "rejected" && filteredData.length === 0) {
    noDataText = "No transaction rejected";
  } else {
    noDataText = "No transaction record yet";
  }

  return (
    <SafeAreaView style={styles.container}>
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
                onPress={() => navigation.navigate("DetailKostScreen", item)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>
    </SafeAreaView>
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
});
