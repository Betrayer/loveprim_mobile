import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import firebase from "firebase"; // Богдан тест
import { firestore, storage, auth, firebaseConfig } from "./firebase/config";

import { store } from "./redux/store";
import { MainScreen } from "./screens/MainScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegistrScreen } from "./screens/RegistrScreen";
import { ItemScreen } from "./screens/additionalScreens/ItemScreen";
import { ReviewsScreen } from "./screens/additionalScreens/ReviewsScreen";
import { SizeChartScreen } from "./screens/additionalScreens/SizeChartScreen";
import { FAQScreen } from "./screens/additionalScreens/FAQScreen";
import { AddReviewsScreen } from "./screens/additionalScreens/ReviewsScreenAdd";
import { CommentImg } from "./screens/additionalScreens/commentImg";
import { ChildrenScreen } from "./screens/additionalScreens/ChildrenScreen";
import { MenScreen } from "./screens/additionalScreens/MenScreen";
import { WomenScreen } from "./screens/additionalScreens/WomenScreen";
import { ShoesScreen } from "./screens/additionalScreens/ShoesScreen";
import { AccesoriesScreen } from "./screens/additionalScreens/AccesoriesScreen";
import { DecorationsScreen } from "./screens/additionalScreens/DecorationsScreen";
import { InStockScreen } from "./screens/additionalScreens/InStockScreen";
import { SalesScreen } from "./screens/additionalScreens/SalesScreen";
import { Drawer } from "./screens/Menu/Drawer";

export default function App() {
  const Stack = createStackNavigator();
  const [isAuth, setIsAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            // options={{ headerShown: false }}
            options={{
              headerTitleAlign: "center",
              headerTitle: "LovePRIM",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Log in",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Registration",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="RegistrScreen"
            component={RegistrScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Item",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="ItemScreen"
            component={ItemScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Комментарии",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="ReviewsScreen"
            component={ReviewsScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Добавить отзыв",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="AddReviewsScreen"
            component={AddReviewsScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Rewievs",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="SizeChartScreen"
            component={SizeChartScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "FAQ",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="FAQScreen"
            component={FAQScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Комментарии",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="CommentImg"
            component={CommentImg}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Дети",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="ChildrenScreen"
            component={ChildrenScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Мужчины",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="MenScreen"
            component={MenScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Женщины",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="WomenScreen"
            component={WomenScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Обувь",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="ShoesScreen"
            component={ShoesScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Ассексуары",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="AccesoriesScreen"
            component={AccesoriesScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Декор",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="DecorationsScreen"
            component={DecorationsScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "В наличии",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="InStockScreen"
            component={InStockScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Скидки",
              headerStyle: {
                backgroundColor: "#6CC4C7",
              },
              headerTintColor: "white",
            }}
            name="SalesScreen"
            component={SalesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
