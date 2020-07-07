import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/operations";
import { firestore, storage } from "../firebase/config";
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
    height: 300,
    position: "absolute",
    top: "10%",
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
