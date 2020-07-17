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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Notifications } from "expo"; // Богдан тест
import * as Permissions from "expo-permissions";
// import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import firebase from "firebase"; // Богдан тест
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/operations";
import { MainProfileScreen } from "./additionalScreens/MainProfileScreen";
import { BacketScreen } from "./additionalScreens/BacketScreen";
import { AuthScreen } from "./AuthScreen";
import { NotificationScreen } from "./additionalScreens/NotificationScreen";
import { CatalogScreen } from "./additionalScreens/CatalogScreen";
import { HomeScreen } from "./additionalScreens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const MainScreen = ({ navigation, route }) => {
  const [userToken, setUserToken] = useState("");
  const { userId, admin, userName } = useSelector((state) => state.user);
  const [drawer, setDrawer] = useState(false);
const [user, setUser] = useState('');
  useEffect(() => {
    setDrawer(false);
    getUser();
  }, []);

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setUser(
          ...data.docs.map((doc) => {
            console.log("doc.id", doc.id);
            return { id: doc.id };
          })
        );
      });
  };

 
 

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          keyboardHidesTabBar: true
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name="md-laptop"
                size={focused ? 40 : 30}
                color={!focused ? "#aaa" : "tomato"}
              />
            ),
          }}
          name="Главная"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name="ios-albums"
                size={focused ? 40 : 30}
                color={!focused ? "#aaa" : "tomato"}
              />
            ),
          }}
          name="Каталог"
          component={CatalogScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name="ios-basket"
                size={focused ? 40 : 30}
                color={!focused ? "#aaa" : "tomato"}
              />
            ),
          }}
          name="Корзина"
          component={BacketScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name="ios-notifications"
                size={focused ? 40 : 30}
                color={!focused ? "#aaa" : "tomato"}
              />
            ),
          }}
          name="Уведомления"
          component={NotificationScreen}
        />
        {userId ? (
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused, size, color }) => (
                <Ionicons
                  name="ios-contact"
                  size={focused ? 40 : 30}
                  color={!focused ? "#aaa" : "tomato"}
                />
              ),
            }}
            name="Профиль"
            component={MainProfileScreen}
          />
        ) : (
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused, size, color }) => (
                <Ionicons
                  name="ios-log-in"
                  size={focused ? 40 : 30}
                  color={!focused ? "#aaa" : "tomato"}
                />
              ),
            }}
            name="Вход"
            component={AuthScreen}
          />
        )}
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
