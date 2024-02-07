import React from "react";
import { View } from "react-native";
import OptionsCard from "./OptionsCard";

export default ListOptions = ({ navigation }) => {
  const optionsList = [
    {
      title: "Kost Putra",
      img: require("../../../assets/icons/male.jpg"),
      screen: "MaleKostListScreen",
    },
    {
      title: "Kost Putri",
      img: require("../../../assets/icons/female.jpg"),
      screen: "FemaleKostListScreen",
    },
  ];

  const handleOptionPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
      }}
    >
      {optionsList.map((option, index) => (
        <OptionsCard
          onPress={() => handleOptionPress(option.screen)}
          key={index}
          title={option.title}
          img={option.img}
        />
      ))}
    </View>
  );
};
