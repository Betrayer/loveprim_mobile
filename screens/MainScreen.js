import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { AboutTab } from "./tabs/aboutTab";
// import { BlogTab } from "./tabs/blogTab";
// import { ServicesTab } from "./tabs/servicesTab";
// import { MainTab } from "./tabs/mainTab";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const MainScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>MAINPAGE</Text>
    </View>
    // <Tab.Navigator
    //   tabBarOptions={{
    //     activeTintColor: "red",
    //     activeBackgroundColor: "black",
    //     showLabel: false,
    //     // tabStyle: {
    //     //   width: 100,
    //     //   height: 100,
    //     //   bottom: 30,
    //     // },
    //     style: {
    //       // backgroundColor: 'blue',
    //       height: 80,
    //     },
    //   }}
    //   inactiveBackgroundColor="red"
    // >
    //   <Tab.Screen
    //     options={{
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <AntDesign
    //           name="laptop"
    //           size={focused ? 56 : 40}
    //           color={focused ? "white" : "#120136"}
    //         />
    //       ),
    //     }}
    //     name="Main"
    //     component={MainTab}
    //   />
    //   <Tab.Screen
    //     options={{
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <MaterialIcons
    //           name="work"
    //           size={focused ? 56 : 40}
    //           color={focused ? "white" : "#fcbf1e"}
    //         />
    //       ),
    //     }}
    //     name="Услуги"
    //     component={ServicesTab}
    //   />
    //   <Tab.Screen
    //     options={{
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <AntDesign
    //           name="team"
    //           size={focused ? 56 : 40}
    //           color={focused ? "white" : "#035aa6"}
    //         />
    //       ),
    //     }}
    //     name="О нас"
    //     component={AboutTab}
    //   />
    //   <Tab.Screen
    //     options={{
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <FontAwesome5
    //           name="blog"
    //           size={focused ? 56 : 40}
    //           color={focused ? "white" : "#40bad5"}
    //         />
    //       ),
    //     }}
    //     name="Блог"
    //     component={BlogTab}
    //   />
    // </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // fontFamily: "ubuntu-regular",

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
