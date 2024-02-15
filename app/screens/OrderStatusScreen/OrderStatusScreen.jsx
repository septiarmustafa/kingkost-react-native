import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import http from "../../config/HttpConfig";
import LoadingComponent from "../../components/LoadingComponent";
import Colors from "../../utils/Colors";

export default OrderStatusScreen = ({ navigation }) => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await http.get("/order-status");
        if (response.status === 200) {
          setOrderStatus(response.data);
        } else {
          console.error("Error fetching order status:", response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/order-status.png")}
        style={styles.image}
      />

      {loading ? (
        <LoadingComponent />
      ) : (
        <Text style={styles.orderStatus}>
          {orderStatus === null
            ? "Pesanan sedang diproses"
            : orderStatus
            ? "Pesanan berhasil"
            : "Pesanan gagal"}
        </Text>
      )}
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ color: Colors.BLACK, fontWeight: "bold" }}>
            Back To Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  orderStatus: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});
