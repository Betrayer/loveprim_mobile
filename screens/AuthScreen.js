import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
} from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Notifications } from "expo"; // Богдан тест
import * as Permissions from "expo-permissions";
// import { FontAwesome5 } from "@expo/vector-icons";
// import Constants from "expo-constants";
// import firebase from "firebase"; // Богдан тест
import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../redux/operations";
// import { ProfileScreen } from "./additionalScreens/ProfileScreen";
import { LoginScreen } from "./LoginScreen";
import { RegistrScreen } from "./RegistrScreen";
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();

export const AuthScreen = ({ navigation, route }) => {
  const { userId, admin, userName } = useSelector((state) => state.user);



//   navigation.setOptions({
//     headerRight: () => (
//       <Text
//         style={styles.register}
//         onPress={() => {
//           !userId ? navigation.navigate("LoginScreen") : logout();
//         }}
//       >
//         {!userId ? "Login" : "LOGOUT"}
//       </Text>
//     ),
//     headerLeft: () => (
//       <Text style={styles.register} onPress={() => toggleDrawer()}>
//         Меню
//       </Text>
//     ),
//   });



  return (
    <>
 

      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          labelStyle: { fontSize: 14, fontFamily: "Roboto-Condensed-Regular"},
            indicatorStyle: { backgroundColor: '#ade9ed' },
            style: { backgroundColor: '#fff' },
            activeTintColor : '#555'
        }}
      >
        <Tab.Screen
          options={{
            // tabBarIcon: ({ focused, size, color }) => (
            //   <Ionicons
            //     name="md-laptop"
            //     size={focused ? 40 : 30}
            //     color={!focused ? "#aaa" : "tomato"}
            //   />
            // ),
          }}
          name="Вход"
          component={LoginScreen}
        />
        <Tab.Screen
          options={{
            // tabBarIcon: ({ focused, size, color }) => (
            //   <Ionicons
            //     name="ios-basket"
            //     size={focused ? 40 : 30}
            //     color={!focused ? "#aaa" : "tomato"}
            //   />
            // ),
          }}
          name="Регистрация"
          component={RegistrScreen}
        />

      </Tab.Navigator>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: "lightblue",
    width: 300,
    height: "auto",
    position: "absolute",
    top: "5%",
    left: 0,
  },
  menuItem: {
    width: "100%",
    height: 50,
    backgroundColor: "grey",
  },
  menuWrapper: {
    width: "100%",
    height: "100%",
  },

});
