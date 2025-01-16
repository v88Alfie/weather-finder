import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface TabIconProps {
  icon: any;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 w-20">
      <Ionicons color={focused ? "white" : "#8f8989"} size={24} name={icon} />
      <Text
        className={
          focused ? "text-white font-semibold" : "text-[#8f8989] font-normal"
        }
      >
        {name}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#8f8989",
        tabBarActiveTintColor: "#f0e9e9",
        tabBarStyle: {
          backgroundColor: "#234D91",
          borderTopColor: "#234D91",
          paddingTop: 20,
          height: 90,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Weather",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={"thunderstorm"} name="Weather" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={"heart"} name="Favorites" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
