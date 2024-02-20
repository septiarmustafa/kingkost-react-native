import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";

import axios from "axios";
import { BASE_HOST } from "../../config/BaseUrl";

const TotalPriceAndCancel = ({
  calculateTotalPrice,
  transactionStatus,
  transactionId,
  customerId,
}) => {
  const isPending = transactionStatus === 0;

  const cancelTransaction = async () => {
    try {
      const response = await axios.get(`${BASE_HOST}/transactions/cancel`, {
        params: {
          transactionId: transactionId,
          customerId: customerId,
        },
      });
      console.log("Cancellation request sent successfully:", response.data);
    } catch (error) {
      console.log("Ini adalah customer: " + customerId);
      console.error("Error cancelling transaction:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.totalPriceText}>Total Price</Text>
        <Text style={styles.totalPriceValue}>{calculateTotalPrice()}</Text>
      </View>
      <View style={styles.bookNowContainer}>
        {isPending && (
          <TouchableOpacity
            style={styles.bookNowButton}
            onPress={cancelTransaction}
          >
            <Text style={{ color: Colors.BLACK, fontWeight: "bold" }}>
              Cancel Booking
            </Text>
          </TouchableOpacity>
        )}
        {!isPending && (
          <Text style={styles.transactionStatusText}>
            Transaction Status: {getTransactionStatusText(transactionStatus)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TotalPriceAndCancel;

const styles = {
  container: {
    height: 70,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  totalPriceText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: "bold",
  },
  totalPriceValue: {
    color: Colors.GREEN,
    fontWeight: "bold",
    fontSize: 18,
  },
  bookNowButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
};
