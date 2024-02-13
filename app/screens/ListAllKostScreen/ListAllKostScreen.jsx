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

export default ListAllKostScreen = ({ navigation, route }) => {
    const kost = route.params;
    // const [provinces, setProvinces] = useState([]);
    // const [cities, setCities] = useState([]);
    // const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
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



    const provinces = [
        {
            "id": "11",
            "name": "ACEH",
            "createdAt": "2024-02-12T10:08:19.316985",
            "updatedAt": null
        },
        {
            "id": "12",
            "name": "SUMATERA UTARA",
            "createdAt": "2024-02-12T10:08:19.419126",
            "updatedAt": null
        },
        {
            "id": "13",
            "name": "SUMATERA BARAT",
            "createdAt": "2024-02-12T10:08:19.42753",
            "updatedAt": null
        },
        {
            "id": "14",
            "name": "RIAU",
            "createdAt": "2024-02-12T10:08:19.434164",
            "updatedAt": null
        },
        {
            "id": "15",
            "name": "JAMBI",
            "createdAt": "2024-02-12T10:08:19.442181",
            "updatedAt": null
        },
        {
            "id": "16",
            "name": "SUMATERA SELATAN",
            "createdAt": "2024-02-12T10:08:19.454746",
            "updatedAt": null
        },
        {
            "id": "17",
            "name": "BENGKULU",
            "createdAt": "2024-02-12T10:08:19.465008",
            "updatedAt": null
        },
        {
            "id": "18",
            "name": "LAMPUNG",
            "createdAt": "2024-02-12T10:08:19.4741",
            "updatedAt": null
        },
        {
            "id": "19",
            "name": "KEPULAUAN BANGKA BELITUNG",
            "createdAt": "2024-02-12T10:08:19.487743",
            "updatedAt": null
        },
        {
            "id": "21",
            "name": "KEPULAUAN RIAU",
            "createdAt": "2024-02-12T10:08:19.501299",
            "updatedAt": null
        },
        {
            "id": "31",
            "name": "DKI JAKARTA",
            "createdAt": "2024-02-12T10:08:19.507872",
            "updatedAt": null
        },
        {
            "id": "32",
            "name": "JAWA BARAT",
            "createdAt": "2024-02-12T10:08:19.517394",
            "updatedAt": null
        },
        {
            "id": "33",
            "name": "JAWA TENGAH",
            "createdAt": "2024-02-12T10:08:19.527685",
            "updatedAt": null
        },
        {
            "id": "34",
            "name": "DAERAH ISTIMEWA YOGYAKARTA",
            "createdAt": "2024-02-12T10:08:19.53595",
            "updatedAt": null
        },
        {
            "id": "35",
            "name": "JAWA TIMUR",
            "createdAt": "2024-02-12T10:08:19.542468",
            "updatedAt": null
        },
        {
            "id": "36",
            "name": "BANTEN",
            "createdAt": "2024-02-12T10:08:19.549022",
            "updatedAt": null
        },
        {
            "id": "51",
            "name": "BALI",
            "createdAt": "2024-02-12T10:08:19.55459",
            "updatedAt": null
        },
        {
            "id": "52",
            "name": "NUSA TENGGARA BARAT",
            "createdAt": "2024-02-12T10:08:19.562146",
            "updatedAt": null
        },
        {
            "id": "53",
            "name": "NUSA TENGGARA TIMUR",
            "createdAt": "2024-02-12T10:08:19.569678",
            "updatedAt": null
        },
        {
            "id": "61",
            "name": "KALIMANTAN BARAT",
            "createdAt": "2024-02-12T10:08:19.578096",
            "updatedAt": null
        },
        {
            "id": "62",
            "name": "KALIMANTAN TENGAH",
            "createdAt": "2024-02-12T10:08:19.585895",
            "updatedAt": null
        },
        {
            "id": "63",
            "name": "KALIMANTAN SELATAN",
            "createdAt": "2024-02-12T10:08:19.595418",
            "updatedAt": null
        },
        {
            "id": "64",
            "name": "KALIMANTAN TIMUR",
            "createdAt": "2024-02-12T10:08:19.602591",
            "updatedAt": null
        },
        {
            "id": "65",
            "name": "KALIMANTAN UTARA",
            "createdAt": "2024-02-12T10:08:19.6111",
            "updatedAt": null
        },
        {
            "id": "71",
            "name": "SULAWESI UTARA",
            "createdAt": "2024-02-12T10:08:19.618145",
            "updatedAt": null
        },
        {
            "id": "72",
            "name": "SULAWESI TENGAH",
            "createdAt": "2024-02-12T10:08:19.626321",
            "updatedAt": null
        },
        {
            "id": "73",
            "name": "SULAWESI SELATAN",
            "createdAt": "2024-02-12T10:08:19.633874",
            "updatedAt": null
        },
        {
            "id": "74",
            "name": "SULAWESI TENGGARA",
            "createdAt": "2024-02-12T10:08:19.640282",
            "updatedAt": null
        },
        {
            "id": "75",
            "name": "GORONTALO",
            "createdAt": "2024-02-12T10:08:19.646788",
            "updatedAt": null
        },
        {
            "id": "76",
            "name": "SULAWESI BARAT",
            "createdAt": "2024-02-12T10:08:19.653817",
            "updatedAt": null
        },
        {
            "id": "81",
            "name": "MALUKU",
            "createdAt": "2024-02-12T10:08:19.661001",
            "updatedAt": null
        },
        {
            "id": "82",
            "name": "MALUKU UTARA",
            "createdAt": "2024-02-12T10:08:19.668045",
            "updatedAt": null
        },
        {
            "id": "91",
            "name": "PAPUA",
            "createdAt": "2024-02-12T10:08:19.676552",
            "updatedAt": null
        },
        {
            "id": "92",
            "name": "PAPUA BARAT",
            "createdAt": "2024-02-12T10:08:19.682112",
            "updatedAt": null
        },
        {
            "id": "93",
            "name": "PAPUA SELATAN",
            "createdAt": "2024-02-12T10:08:19.687111",
            "updatedAt": null
        },
        {
            "id": "94",
            "name": "PAPUA TENGAH",
            "createdAt": "2024-02-12T10:08:19.690551",
            "updatedAt": null
        },
        {
            "id": "95",
            "name": "PAPUA PEGUNUNGAN",
            "createdAt": "2024-02-12T10:08:19.695552",
            "updatedAt": null
        }
    ]



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
        setCurrentPage(currentPage + 1);
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
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                />
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
                            <TouchableOpacity onPress={()=> setShowFilterModal(false)}>
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
                                    {provinces.map((province) => (
                                        <Picker.Item key={province.id} label={province.name} value={province.id} />
                                    ))}
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
});