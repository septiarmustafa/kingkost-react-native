import React from "react";
import { View } from "react-native";
import OptionsCard from "./OptionsCard";

export default ListOptions = () => {
  const optionsList = [
    { title: "Kost Putra", img: require("../../../assets/icons/male.jpg") },
    { title: "Kost Putri", img: require("../../../assets/icons/female.jpg") },
  ];

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
      {optionsList.map((option, index) => (
        <OptionsCard key={index} title={option.title} img={option.img} />
      ))}
    </View>
  );
};