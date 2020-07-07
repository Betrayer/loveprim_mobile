import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import  firebase  from "firebase"; // Богдан тест
import { firestore, storage, auth, firebaseConfig } from "./firebase/config";

import { store } from "./redux/store";
import { MainScreen } from "./screens/MainScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegistrScreen } from "./screens/RegistrScreen";
import { ItemScreen } from "./screens/additionalScreens/ItemScreen";
import { ReviewsScreen } from "./screens/additionalScreens/ReviewsScreen";
import { SizeChartScreen } from "./screens/additionalScreens/SizeChartScreen";
import { FAQScreen } from "./screens/additionalScreens/FAQScreen";
// import { DeckSwiperExample } from "./screens/additionalScreens/FAQScreen";
// firebase.initializeApp(firebaseConfig); // Богдан тест


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
                backgroundColor: Platform.OS === "ios" ? "black" : "#6CC4C7",
              },
              headerTintColor: Platform.OS === "ios" ? "blue" : "black",
            }}
            name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Log in",
              headerStyle: {
                backgroundColor: Platform.OS === "ios" ? "black" : "blue",
              },
              headerTintColor: Platform.OS === "ios" ? "blue" : "black",
            }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Registration",
              headerStyle: {
                backgroundColor: Platform.OS === "ios" ? "black" : "blue",
              },
              headerTintColor: Platform.OS === "ios" ? "blue" : "black",
            }}
            name="RegistrScreen"
            component={RegistrScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Item",
              headerStyle: {
                backgroundColor: Platform.OS === "ios" ? "black" : "blue",
              },
              headerTintColor: Platform.OS === "ios" ? "blue" : "black",
            }}
            name="ItemScreen"
            component={ItemScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "Rewievs",
              headerStyle: {
                backgroundColor: Platform.OS === "ios" ? "black" : "blue",
              },
              headerTintColor: Platform.OS === "ios" ? "blue" : "black",
            }}
            name="ReviewsScreen"
            component={ReviewsScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "SizeChart",
              headerStyle: {
                backgroundColor: Platform.OS === "ios" ? "black" : "blue",
              },
              headerTintColor: Platform.OS === "ios" ? "blue" : "black",
            }}
            name="SizeChartScreen"
            component={SizeChartScreen}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: "FAQ",
              headerStyle: {
                backgroundColor: Platform.OS === "ios" ? "black" : "blue",
              },
              headerTintColor: Platform.OS === "ios" ? "blue" : "black",
            }}
            name="FAQScreen"
            component={FAQScreen}
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
