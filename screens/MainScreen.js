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
import { NavigationContainer } from "@react-navigation/native";
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
  const { userId, admin, userToken } = useSelector((state) => state.user);
  const [drawer, setDrawer] = useState(false);
  const [user, setUser] = useState("");
  const [notificationList, setNotificationList] = useState([]);
  const [pushNotif, setPushNotif] = useState([]);
  const [timernator, setTimernator] = useState(false);
  const [allToken, setAllToken] = useState([]);
  const [dataPush, setDataPush] = useState();
  const [changeData, setChangeData] = useState(Date.now());
  const [pushFlag, setPushFlag] = useState(false);

  useEffect(() => {
    setDrawer(false);
    getUser();
    getPushNotif();
    getAllUserToken();
    getData();
  }, []);

  useEffect(() => {
    // dateNow();
    if (allToken && dataPush) {
      verifyPush();
    }
    if (pushNotif[0]) {
      setTimernator(true);
    }
  }, [notificationList]);

  useEffect(() => {
    if (timernator) {
      timer();
    }
  }, [timernator]);

  useEffect(() => {
    if (route.params) {
      if (route.params.info === "backet") {
        navigationBacket();
      }
    }
  }, [route.params]);

  useEffect(() => {
    getNotifications();
  }, [userId]);

  useEffect(() => {
    if (pushFlag) {
      sendPush();
    }
  }, [pushFlag]);

  // const dateNow = () => {
  //   setInterval(() => {
  //     setChangeData(Date.now());
  //   }, 10000);
  //   console.log("changeData", changeData);
  // };

  const navigationBacket = () => {
    navigation.navigate("Корзина");
  };

  const getData = async () => {
    await firestore
      .collection("users")
      .doc("kurs")
      .get()
      .then(function (snapshot) {
        const username = snapshot.data();
        setDataPush(username.allPush);
      });
  };

  const sendPush = () => {
    setPushFlag(false);
    console.log("PUSH2");
    allToken.map((user) => {
      sendPushAll(user);
    });
  };

  const verifyPush = async () => {
    if (Date.now() > Number(dataPush) + 172800000) {
      // if (Date.now() > Number(dataPush) + 60000) {

      console.log("PUSH1");
      await firestore.collection("users").doc("kurs").update({
        allPush: Date.now(),
      });
      setPushFlag(true);
      getData();
    }
  };

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setUser(
          ...data.docs.map((doc) => {
            return { id: doc.id };
          })
        );
      });
  };

  const getAllUserToken = async () => {
    await firestore.collection("users").onSnapshot((data) => {
      setAllToken(
        data.docs.map((doc, ind) => {
          return { ...doc.data(), id: doc.id, key: { ind } };
        })
      );
    });
  };

  const getPushNotif = async () => {
    await firestore.collection("notifications").onSnapshot((data) => {
      setPushNotif(
        data.docs
          .map((doc, ind) => {
            return { ...doc.data(), id: doc.id, key: { ind } };
          })
          .filter((item) => item.alreadySent === false)
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

  const sendPushAll = async (user) => {
    const message = {
      to: user.userToken,
      sound: "default",
      title: "Hello there",
      body: "2 days",
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
  };

  const sendPushNotification = async (notif) => {
    const message = {
      to: notif.userToken,
      sound: "default",
      title: notif.title,
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
  };

  const timer = async () => {
    setTimernator(false);
    console.log("timernator", timernator);
    await pushNotif.map((notif) => {
      sendPushNotification(notif).then(setTimernator(false));
    });
  };

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          keyboardHidesTabBar: true,
          labelStyle: {
            fontSize: 12,
            fontFamily: "Roboto-Condensed-Regular",
          },
          activeTintColor: "#5bb3b6",
        }}
      >
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
      {/* </NavigationContainer> */}
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
