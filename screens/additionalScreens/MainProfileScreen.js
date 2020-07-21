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
import { ProfileScreen } from "./ProfileScreen";
import { AdminPageScreen } from "./AdminPageScreen";
import { ProfileListScreen } from "./ProfileListScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();

export const MainProfileScreen = ({ navigation, route }) => {
  const { userId, admin, userName } = useSelector((state) => state.user);

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
        {admin ? (
          <Tab.Screen
            options={
              {
                // tabBarIcon: ({ focused, size, color }) => (
                //   <Ionicons
                //     name="ios-basket"
                //     size={focused ? 40 : 30}
                //     color={!focused ? "#aaa" : "tomato"}
                //   />
                // ),
              }
            }
            name="Админ панель"
            component={AdminPageScreen}
          />
        ) : (
          <Tab.Screen
            options={
              {
                // tabBarIcon: ({ focused, size, color }) => (
                //   <Ionicons
                //     name="ios-basket"
                //     size={focused ? 40 : 30}
                //     color={!focused ? "#aaa" : "tomato"}
                //   />
                // ),
              }
            }
            name="Список заказов"
            component={ProfileListScreen}
          />
        )}
        <Tab.Screen
          options={
            {
              // tabBarIcon: ({ focused, size, color }) => (
              //   <Ionicons
              //     name="md-laptop"
              //     size={focused ? 40 : 30}
              //     color={!focused ? "#aaa" : "tomato"}
              //   />
              // ),
            }
          }
          name="Профиль"
          component={ProfileScreen}
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
