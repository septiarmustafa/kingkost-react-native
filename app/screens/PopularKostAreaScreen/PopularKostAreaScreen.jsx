import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";

import Colors from "../../utils/Colors";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/DetailKost/BackButton";
import SearchBar from "../../components/PopularKostArea/SearchBar";
import KostItem from "../../components/PopularKostArea/KostItem";
import NoDataFound from "../../components/NoDataFound";

export default PopularKostArea = ({ navigation, route }) => {
  const kost = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [kostData, setKostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setKostData(kost);
  }, [kost]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = kost.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setKostData(filteredData);
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
        setCurrentPage(currentPage + 1);
    }
};

const handlePreviousPage = () => {
    if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
    }
};

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
          <Text style={styles.title}>
            List Kost Area
          </Text>
        </View>
        <SearchBar onSearch={handleSearch} />
      </View>
      <View style={styles.listCard}>
        {kostData.length === 0 ? (
          <NoDataFound />
        ) : (
          <FlatList
            data={kostData}
            renderItem={({ item }) => (
              <KostItem
                item={item}
                onPress={() => navigation.navigate("DetailKostScreen", item)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>
      <View style={styles.pagination}>
        <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 0}>
          <View style={styles.paginationButton}>
            <Text style={[styles.paginationText, { color: currentPage === 0 ? 'gray' : 'black' }]}>Previous</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.paginationText}>{currentPage + 1}/{totalPage}</Text>
        <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPage - 1}>
          <View style={styles.paginationButton}>
            <Text style={[styles.paginationText, { color: currentPage === totalPage - 1 ? 'gray' : 'black' }]}>Next</Text>
          </View>
        </TouchableOpacity>
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
  listCard: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 20,
},
paginationText: {
    fontSize: 16,
    textAlign: "center",
    alignContent : "center"
},
paginationButton: {
    height: 30,
    width: 80,
    marginVertical: 10,
    borderRadius: 5,
    paddingTop : 3,
    backgroundColor: Colors.PRIMARY_COLOR
}
});
