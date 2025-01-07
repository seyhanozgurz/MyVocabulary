import { View, Text, ActivityIndicator, Image } from "react-native";
import React, { useState } from "react";
import { widthPersentage } from "./responsiveCalculator";

export const WaitScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        resizeMode="contain"
        style={{
          height: widthPersentage(50),
          alignSelf: "center",
          marginVertical: widthPersentage(5),
        }}
        source={require("../assets/images/welcome.jpg")}
      />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
