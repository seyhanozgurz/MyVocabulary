import React from "react";
import { Tabs } from "expo-router";
import { heightPersentage as hp } from "../../components/responsiveCalculator";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";

export default function _layout() {
  return (
    <Tabs initialRouteName="home" backBehavior="initialRoute">
      <Tabs.Screen
        name="addWord"
        options={{
          title: "add new word",
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontSize: 10, color: focused ? "#e60b09" : "#133068" }}
            >
              add new word
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              size={hp(3)}
              name="plus"
              color={focused ? "#e60b09" : "#133068"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontSize: 10, color: focused ? "#e60b09" : "#133068" }}
            >
              home
            </Text>
          ),

          tabBarItemStyle: "green",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              size={hp(3)}
              name="home"
              color={focused ? "#e60b09" : "#133068"}
            />
          ),
          // headerRight: () => <LogoutButton />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontSize: 10, color: focused ? "#e60b09" : "#133068" }}
            >
              profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              size={hp(3)}
              name="user"
              color={focused ? "#e60b09" : "#133068"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="word"
        options={{
          headerShown: false,
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
