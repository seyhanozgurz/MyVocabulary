import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
    widthPersentage as wp,
    heightPersentage as hp,
  } from "./responsiveCalculator";
  import colors from "../assets/colors";

const WordButton = ({ item, index, onPress }) => {
  const colorList = [
    [colors.darkBlue, colors.darkPink],
    [colors.darkPink, colors.red],
  ];
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={colorList[index % 2]}
      start={[0, 0]}
      end={[1, 0]}
    >
      <TouchableOpacity
        onPress={() => onPress( item )}
        style={styles.touchable}
      >
        <Text style={styles.wordText}>{item.word}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: wp(60),
    borderRadius: 100,
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
    elevation: 10,
  },
  touchable: {
    borderRadius: 100,
    margin: 5,
    alignItems: "center",
    width: wp(60),
  },
  wordText: {
    fontSize: 25,
    padding: 5,
    color: "white",
    fontWeight: "bold",
  },
});

export default WordButton;
