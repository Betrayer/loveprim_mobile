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
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const MainScreen = ({ navigation, route }) => {
  const { userId, admin, userName } = useSelector((state) => state.user);
  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState({});
  const [drawer, setDrawer] = useState(false);

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


  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      console.log("userId", userId);
      try {
        let token = await Notifications.getExpoPushTokenAsync();
        console.log("token", token);
        firebase
        .database()
        .ref("users/" + userId + "/push_token")
        .set(token);
      } catch (error) {
        console.log("error", error);
      }
      // console.log(token);
      // this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }


    
  };
  // =-=-=-=--=-=-=-=-=
  useEffect(() => {
    if (user) {
      async function pushNotify() {
        try {
          await registerForPushNotificationsAsync();
        } catch (error) {
          console.log("PushEror", error);
        }
      }
      pushNotify();
    }
  }, [user]);

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
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
          name="Home"
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
          name="Catalog"
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
          name="Backet"
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
          name="Notification"
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
            name="Profile"
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
            name="AuthScreen"
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
