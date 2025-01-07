import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../context/authContext";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPersentage as wp,
  heightPersentage as hp,
} from "./responsiveCalculator";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    console.log("handleLogout");
    await logout();
  };
  return (
    <TouchableOpacity
      style={{
        padding: 10,      
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={handleLogout}
    >
      <MaterialIcons name="logout" size={30} color={"black"}></MaterialIcons>
      <Text style={{ fontSize:hp(3) ,fontWeight: "500",marginLeft:5 }}>logout</Text>
    </TouchableOpacity>
  );
}
