import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
  Button,
} from "react-native";
// import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Notifications } from "expo"; // Богдан тест
import * as Permissions from "expo-permissions";
// import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import firebase from "firebase"; // Богдан тест
import { firestore } from "../firebase/config";
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
  // const [userToken, setUserToken] = useState("");
  const { userId, admin, userToken } = useSelector((state) => state.user);
  const [drawer, setDrawer] = useState(false);
  const [user, setUser] = useState("");
  const [notificationList, setNotificationList] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    setDrawer(false);
    getUser();
  }, []);

  useEffect(() => {
    getNotifications();
  }, [userId]);

  // useEffect(() => {
  //   const ch = route
  //   console.log(ch)
  //   if (ch.param.info) {
  //     navigationBacket();
  //   }
  // }, []);

  const navigationBacket = () => {
    navigation.navigate("BacketScreen");
  };

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setUser(
          ...data.docs.map((doc) => {
            // console.log("doc.id", doc.id);
            return { id: doc.id };
          })
        );
      });
  };

  useEffect(() => {
    if (userId) {
      getNotifications();
    }
  }, []);

  useEffect(() => {
    if (allNotifications[0]) {
      allNotifications.map((notif) => {
        sendPushNotification(notif);
      });
    }
  }, [allNotifications]);

  const getAllNotifications = async () => {
    await firestore.collection("notifications").onSnapshot((data) => {
      setAllNotifications(
        data.docs
          .map((doc, ind) => {
            return { ...doc.data(), id: doc.id, key: { ind } };
          })
          .filter((item) => !item.alreadySent)
          .sort(function (a, b) {
            if (a.date > b.date) {
              return -1;
            }
            if (a.date < b.date) {
              return 1;
            }
            return 0;
          })
      );
    });
  };

  const getNotifications = async () => {
    await firestore
      .collection("notifications")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setNotificationList(
          data.docs
            .map((doc, ind) => {
              return { ...doc.data(), id: doc.id, key: { ind } };
            })
            .sort(function (a, b) {
              if (a.date > b.date) {
                return -1;
              }
              if (a.date < b.date) {
                return 1;
              }
              return 0;
            })
        );
      });
  };

  const sendPushNotification = async (notif) => {
    const message = {
      to: notif.userToken,
      sound: "default",
      title: "Hello there",
      body: notif.notification,
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
    await firestore.collection("notifications").doc(notif.id).update({
      alreadySent: true,
    });
    // console.log("notificationList", notificationList);
  };

  return (
    <>
      <Button title="SLAP ME, DADDY" onPress={() => sendPushNotification()} />
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          keyboardHidesTabBar: true,
          labelStyle: { fontSize: 12, fontFamily: "Roboto-Condensed-Regular" },
          activeTintColor: "#5bb3b6",
        }}
      >
        {/* {console.log("route", route)} */}
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name="md-home"
                size={focused ? 38 : 30}
                color={!focused ? "#aaa" : "#5bb3b6"}
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
                size={focused ? 38 : 30}
                color={!focused ? "#aaa" : "#5bb3b6"}
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
                size={focused ? 38 : 30}
                color={!focused ? "#aaa" : "#5bb3b6"}
              />
            ),
          }}
          name="Корзина"
          component={BacketScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View>
                <Ionicons
                  name="ios-notifications"
                  size={focused ? 40 : 30}
                  color={!focused ? "#aaa" : "#5bb3b6"}
                />
                {notificationList.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      left: 7,
                      top: -3,
                      backgroundColor: "red",
                      borderRadius: 6,
                      padding: 2,
                      paddingHorizontal: 4,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {notificationList.length}
                    </Text>
                  </View>
                )}
              </View>
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
                  size={focused ? 38 : 30}
                  color={!focused ? "#aaa" : "#5bb3b6"}
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
                  size={focused ? 38 : 30}
                  color={!focused ? "#aaa" : "#5bb3b6"}
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
