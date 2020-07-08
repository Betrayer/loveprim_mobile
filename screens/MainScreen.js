import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Notifications } from "expo"; // Богдан тест
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import firebase from "firebase"; // Богдан тест
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/operations";
import { ProfileScreen } from "./additionalScreens/ProfileScreen";
import { BacketScreen } from "./additionalScreens/BacketScreen";
import { HomeScreen } from "./additionalScreens/HomeScreen";

const Tab = createBottomTabNavigator();

export const MainScreen = ({ navigation, route }) => {
  const { userId, admin, userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);

  const [drawer, setDrawer] = useState(false);

  const logout = () => {
    console.log("LOGOUT");
    dispatch(logoutUser());
  };

  useEffect(() => {
    setDrawer(false);
  }, []);

  navigation.setOptions({
    headerRight: () => (
      <Text
        style={styles.register}
        onPress={() => {
          !userId ? navigation.navigate("LoginScreen") : logout();
        }}
      >
        {!userId ? "Login" : "LOGOUT"}
      </Text>
    ),
    headerLeft: () => (
      <Text style={styles.register} onPress={() => toggleDrawer()}>
        Меню
      </Text>
    ),
  });

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const toReviews = () => {
    navigation.navigate("ReviewsScreen");
    toggleDrawer();
  };

  const toFAQ = () => {
    navigation.navigate("FAQScreen");
    toggleDrawer();
  };

  const toSizeChart = () => {
    navigation.navigate("SizeChartScreen");
    toggleDrawer();
  };

  const toChildren = () => {
    navigation.navigate("ChildrenScreen");
    toggleDrawer();
  };

  const toMen = () => {
    navigation.navigate("MenScreen");
    toggleDrawer();
  };

  const toWomen = () => {
    navigation.navigate("WomenScreen");
    toggleDrawer();
  };

  const toShoes = () => {
    navigation.navigate("ShoesScreen");
    toggleDrawer();
  };

  const toAccesories = () => {
    navigation.navigate("WomenScreen");
    toggleDrawer();
  };

  const toDecor = () => {
    navigation.navigate("WomenScreen");
    toggleDrawer();
  };

  const toStock = () => {
    navigation.navigate("WomenScreen");
    toggleDrawer();
  };

  const toSales = () => {
    navigation.navigate("WomenScreen");
    toggleDrawer();
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
        // firebase
        // .database()
        // .ref("users/" + userId + "/push_token")
        // .set(token);
      } catch (error) {
        console.log("error", error);
      }
      // console.log(token);
      // this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  useEffect(() => {
    async function pushNotify() {
      try {
        await registerForPushNotificationsAsync();
      } catch (error) {
        console.log("PushEror", error);
      }
    }
    pushNotify();
  }, []);

  // =-=-=-=--=-=-=-=-=

  return (
    <>
      <View>
        <Text>{userName}</Text>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
        }}
      >
        <Tab.Screen
          // options={{
          //   tabBarIcon: ({ focused, size, color }) => (
          //     <AntDesign
          //       name="laptop"
          //       size={focused ? 56 : 40}
          //       color={focused ? "white" : "tomato"}
          //     />
          //   ),
          // }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          // options={{
          //   tabBarIcon: ({ focused, size, color }) => (
          //     <AntDesign
          //       name="laptop"
          //       size={focused ? 56 : 40}
          //       color={focused ? "white" : "tomato"}
          //     />
          //   ),
          // }}
          name="Backet"
          component={BacketScreen}
        />
        <Tab.Screen
          // options={{
          //   tabBarIcon: ({ focused, size, color }) => (
          //     <AntDesign
          //       name="laptop"
          //       size={focused ? 56 : 40}
          //       color={focused ? "white" : "tomato"}
          //     />
          //   ),
          // }}
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
      {drawer ? (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => toReviews()} style={styles.menuItem}>
            <Text>Отзывы</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toFAQ()} style={styles.menuItem}>
            <Text>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toSizeChart()}
            style={styles.menuItem}
          >
            <Text>Размерная сетка</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toChildren()}
            style={styles.menuItem}
          >
            <Text>Дети</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toMen()} style={styles.menuItem}>
            <Text>Мужчины</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toWomen()} style={styles.menuItem}>
            <Text>Женщинцы</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toShoes()} style={styles.menuItem}>
            <Text>Обувь</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toAccesories()}
            style={styles.menuItem}
          >
            <Text>Аксессуары</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toDecor()} style={styles.menuItem}>
            <Text>Декор</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toStock()} style={styles.menuItem}>
            <Text>Товар в наличии</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toSales()} style={styles.menuItem}>
            <Text>Скидки</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
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
