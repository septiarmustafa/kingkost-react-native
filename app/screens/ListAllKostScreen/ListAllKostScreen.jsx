import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
} from "react-native";
import { Feather } from '@expo/vector-icons';
import Colors from "../../utils/Colors";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/DetailKost/BackButton";
import SearchBar from "../../components/PopularKostArea/SearchBar";
import KostItem from "../../components/PopularKostArea/KostItem";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from '@expo/vector-icons';
import http from "../../config/HttpConfig"
import { BASE_HOST } from "../../config/BaseUrl";

export default ListAllKostScreen = ({ navigation, route }) => {
    const kost = route.params;
    // const [provinces, setProvinces] = useState([]);
    // const [cities, setCities] = useState([]);
    // const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [kostData, setKostData] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);

    // const fetchProvinces = async () => {
    //     try {
    //         console.log("get provinces");
    //         const response = await http.get('/province');
    //         setProvinces(response.data);
    //     } catch (error) {
    //         console.error('Error fetching provinces:', error);
    //     }
    // };

    // const fetchCities = async (provinceId) => {
    //     try {
    //         const response = await http.get(`/city?province_id=${provinceId}`);
    //         setCities(response.data);
    //     } catch (error) {
    //         console.error('Error fetching cities:', error);
    //     }
    // };

    // const fetchDistricts = async (cityId) => {
    //     try {
    //         const response = await http.get(`/subdistrict?city_id=${cityId}`);
    //         setDistricts(response.data);
    //     } catch (error) {
    //         console.error('Error fetching districts:', error);
    //     }
    // };

    // useEffect(() => {

    //     fetchProvinces();
    // }, []);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get(`/kost?page=${currentPage}`);
                const newData = response.data.data;
                const paggingResponse = response.data.paggingResponse
                const kostData = newData.map((item) => ({
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
                setKostData((prevData) => {
                    if (kostData.length > 0) {
                        if (currentPage === 0) {
                            return kostData;
                        } else {
                            return [...prevData, ...kostData];
                        }
                    } else {
                        return prevData;
                    }
                });
                setTotalPage(paggingResponse.totalPage);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [currentPage]);

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

    const handleLoadMore = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const handleFilterIconPress = () => {
        setShowFilterModal(true);
    };

    const handleFilter = (filterType) => {
        console.log("Filter selected:", filterType);
        setShowFilterModal(false);
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
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginRight: 25 }}>
                        <Text style={styles.title}>List Kost </Text>
                        <TouchableOpacity onPress={handleFilterIconPress}>
                            <Feather name="filter" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
                <SearchBar onSearch={handleSearch} />
            </View>
            <View style={styles.listCard}>
                <FlatList
                    data={kostData}
                    renderItem={({ item }) => (
                        <KostItem
                            item={item}
                            onPress={() => navigation.navigate("DetailKostScreen", item)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                    extraData={kostData} 
                />
            </View>
            <View style={styles.pagination}>
                <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 1}>
                    <Text style={[styles.paginationText, { color: currentPage === 1 ? 'gray' : 'black' }]}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.paginationText}>{currentPage}/{totalPage}</Text>
                <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPage}>
                    <Text style={[styles.paginationText, { color: currentPage === totalPage ? 'gray' : 'black' }]}>Next</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={showFilterModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilterModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.modalTitle}>Filter By</Text>
                            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                                <AntDesign name="closecircle" size={24} color={Colors.BLACK} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropdownContainer}>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedProvince}
                                    style={styles.dropdown}
                                    onValueChange={(itemValue) => {
                                        setSelectedProvince(itemValue);
                                        // fetchCities(itemValue);
                                    }}>
                                    {/* {provinces.map((province) => (
                                        <Picker.Item key={province.id} label={province.name} value={province.id} />
                                    ))} */}
                                </Picker>
                            </View>
                            {/* <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedCity}
                                    style={styles.dropdown}
                                    onValueChange={(itemValue) => {
                                        setSelectedCity(itemValue);
                                        fetchDistricts(itemValue);
                                    }}>
                                    {cities.map((city) => (
                                        <Picker.Item key={city.id} label={city.name} value={city.id} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedDistrict}
                                    style={styles.dropdown}
                                    onValueChange={(itemValue) => setSelectedDistrict(itemValue)}>
                                    {districts.map((district) => (
                                        <Picker.Item key={district.id} label={district.name} value={district.id} />
                                    ))}
                                </Picker>
                            </View> */}

                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity>
                                <View style={styles.filter}>
                                    <Text style={{
                                        fontSize: 20, margin: 8, textAlign
                                            : "center"
                                    }}>Filter</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity>
                                <View style={styles.filter}>
                                    <Text style={{
                                        fontSize: 20, margin: 8, textAlign
                                            : "center"
                                    }}>Reset Filter</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    appBar: {
        backgroundColor: Colors.WHITE,
    },
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: Colors.WEAK_COLOR,
    },
    reset: {
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY_COLOR
    },
    filter: {
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY_COLOR,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    listCard: {
        marginHorizontal: 20,
        marginTop: 20,
        flex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalContent: {
        backgroundColor: Colors.WEAK_COLOR,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: 350
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: Colors.BLACK
    },
    modalOption: {
        fontSize: 18,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
    },
    dropdownContainer: {
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        marginBottom: 10,
    },
    pickerContainer: {
        marginHorizontal: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    paginationText: {
        fontSize: 16,
    },
});